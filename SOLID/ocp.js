// ocp에 대새서 코드를 쓰면서 공부해보기

// 입력된 multiplier 값으로 배열 각 요소 곱한 값을 반환하는 함수
function multiplyArrayElements(array, multiplier) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    result.push(array[i] * multiplier);
  }

  return result;
}

// 음 예제와 다르게 기본적으로 option 을 받지 않고, 더 일반적인 상황을 가정해서 multiplier가 변경되어도 기존 코드 변경 없이 처리된다는 점은 장점인듯

// 그런데 함수를 전달하는 방식과 나의 방식은 무슨 차이가 있을까?
function executeParameterFunctionForEachArrElement(array, fn) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    result.push(fn(array[i], i, array));
  }

  return result;
}

// multiplier는 여전히 어떤 기능을 통합적으로 동일하게 적용시키에는 제한이 있다.
// 많이 확장되기가 어려움.

// 반면에 함수를 전달하는 형태로 구현하면 함수의 구현에 따라서 다양한 확장 가능성이 생김.
// 값으로 처리하냐, 아니면 하나의 기능으로 처리하냐의 차이로 생각됨.
