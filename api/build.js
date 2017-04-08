import {build} from '../engine/builder.js'

import { fail, succeed } from './../lib/respond'


export function site(event, context, callback) {
  build((error) => {
    succeed({success: true}, callback)
  })
}