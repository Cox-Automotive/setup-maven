// noinspection JSIgnoredPromiseFromCall

import * as core from '@actions/core'
import * as main from './main'

async function run(): Promise<void> {
  try {
    const version = core.getInput('maven-version')
    if (version) await main.getMaven(version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
