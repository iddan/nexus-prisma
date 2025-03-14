import * as fs from 'fs-jetpack'
import * as Path from 'path'

export function assertBuildPresent() {
  if (fs.exists(Path.join(__dirname, '../../dist-esm')) === false)
    throw new Error(`Please run build ESM before running this test`)

  if (fs.exists(Path.join(__dirname, '../../dist-cjs')) === false)
    throw new Error(`Please run build CJS before running this test`)
}
