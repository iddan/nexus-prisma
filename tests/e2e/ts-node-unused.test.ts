import dindist from 'dindist'
import 'ts-replace-all'
import { createPrismaSchema } from '../__helpers__/testers'
import { setupTestProject } from '../__helpers__/testProject'

it('when project does not have ts-node installed nexus-prisma generator still generates if there are no TS generator config files present', async () => {
  const testProject = setupTestProject({
    files: {
      packageJson: {
        scripts: {
          build: 'prisma generate',
        },
        dependencies: {
          '@prisma/client': '2.30',
          graphql: '15.5.1',
          nexus: '1.1.0',
          prisma: '2.30',
        },
      },
      other: [
        {
          filePath: `prisma/schema.prisma`,
          content: createPrismaSchema({
            content: dindist`
							model Foo {
								id  String  @id
							}
						`,
          }),
        },
      ],
    },
  })

  const result = await testProject.runOrThrowNpmScript(`build`)

  expect(normalizeGeneratorOutput(result.stdout)).toMatchSnapshot()
})

const normalizeGeneratorOutput = (output: string) =>
  output
    .replaceAll(/\d+ms/g, '<SOME TIME>ms')
    .replaceAll(/ to .* in /g, ' to <SOME PATH> in ')
    .replaceAll(/loaded from.*/g, 'loaded from <SOME PATH>')
    .replaceAll(/Generated Prisma Client \(.*\)/g, 'Generated Prisma Client (<SOME VERSION>)')
