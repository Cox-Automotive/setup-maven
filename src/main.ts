import * as core from '@actions/core'
import * as toolCache from '@actions/tool-cache'
import * as path from 'path'

let tempDirectory = process.env['RUNNER_TEMPDIRECTORY'] || ''

// Sets base dir from arch.
// FIXME: There's gotta be a cleaner way for this.
if (!tempDirectory) {
  let baseLocation: string
  if (process.platform === 'win32') {
    baseLocation = process.env['USERPROFILE'] || 'C:\\'
  } else {
    if (process.platform === 'darwin') {
      baseLocation = '/Users'
    } else {
      baseLocation = '/home'
    }
  }
  tempDirectory = path.join(baseLocation, 'actions', 'temp')
}

export async function getMaven(version: string): Promise<void> {
  // TODO: Find library for allowing: >=3.0.0 or 3.0.x or >= 3.8.5 <= 4.0.0
  if (!version.match('^\\d+(\\.\\d+){0,2}$'))
    throw new Error('invalid version input')
  let toolPath = toolCache.find('maven', version)
  if (!toolPath) await downloadMaven(version)
  toolPath = path.join(toolPath, 'bin')
  core.addPath(toolPath)
}

async function downloadMaven(version: string): Promise<string> {
  const toolDirectoryName = `apache-maven-${version}`

  const downloadURL = `https://apache.org/dyn/closer.cgi?filename=maven/maven-3/${version}/binaries/${toolDirectoryName}-bin.tar.gz&action=download`
  console.log(`downloading: ${downloadURL}`) // eslint-disable-line no-console

  try {
    const downloadPath = await toolCache.downloadTool(downloadURL)
    const extractedPath = await toolCache.extractTar(downloadPath)
    const toolRoot = path.join(extractedPath, toolDirectoryName)
    return await toolCache.cacheDir(toolRoot, 'maven', version)
  } catch (error) {
    throw error
  }
}
