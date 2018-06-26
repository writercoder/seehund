import {build} from '../engine/builder.js'

import { fail, succeed } from './lib/respond'


export function site(event, context, callback) {
  build((error) => {
    if(error) {
      fail(error, callback)
    } else {
      succeed({success: true}, callback)
    }
  })
}
