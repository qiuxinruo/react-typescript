import { ofType } from 'redux-observable'
import { fromEvent, Observable, from, merge } from 'rxjs'
import {
  map,
  mapTo,
  takeUntil,
  concatMap,
  scan,
  sample,
  throttleTime,
} from 'rxjs/operators'

import { Action } from './actions'

const mouseMove$ = fromEvent(window, 'mousemove')
const mouseUp$ = fromEvent(window, 'mouseup')

export default []
