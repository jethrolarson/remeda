import { purry } from './purry';
import { _reduceLazy } from './_reduceLazy';

/**
 * Removes first `n` elements from the `array`.
 * @param array the target array
 * @param n the number of elements to skip
 * @signature
 *    R.drop(array, n)
 * @example
 *    R.drop([1, 2, 3, 4, 5], 2) // => [1, 2, 3]
 * @data_first
 * @pipeable
 * @category Array
 */
export function drop<T>(array: T[], n: number): T[];

/**
 * Removes last `n` elements from the `array`.
 * @param array the target array
 * @param n the number of elements to skip
 * @signature
 *    R.drop(n)(array)
 * @example
 *    R.drop(2)([1, 2, 3, 4, 5]) // => [1, 2, 3]
 * @data_last
 * @pipeable
 * @category Array
 */
export function drop<T>(n: number): (array: T[]) => T[];

export function drop() {
  return purry(_drop, arguments, drop.lazy);
}

function _drop<T>(array: T[], n: number) {
  return _reduceLazy(array, drop.lazy(n));
}

export namespace drop {
  export function lazy<T>(n: number) {
    let left = n;
    return (value: T) => {
      if (left > 0) {
        left--;
        return {
          done: false,
          hasNext: false,
        };
      }
      return {
        done: false,
        hasNext: true,
        next: value,
      };
    };
  }
}
