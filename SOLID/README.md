# SOLID in JavaScript

SOLID원칙은 객체지향 프로그래밍을 기준으로 만들어졌다.

그런데 JavaScript는 완전한 객체지향 언어는 아니라서 나도 공부하면서 `아 그래 좋은데, 그래서 내가 평상시에 코딩할 때 이런 원칙들을 어떻게 반영해야돼?`라는 의문이 들었다.

그래서 관련 자료를 찾아서 공부를 하면서 내 코드에 SOLID를 자연스럽게 녹여내려고 노력해보려고 한다.

[참고자료](https://velog.io/@teo/Javascript%EC%97%90%EC%84%9C%EB%8F%84-SOLID-%EC%9B%90%EC%B9%99%EC%9D%B4-%ED%86%B5%ED%95%A0%EA%B9%8C)

## S - SRP, 단일 책임 원칙

`Single Responsibility Principle`

하나의 함수는 오직 하나의 책임을 가져야 한다. 하나의 책임을 가진다는 것은 변경되는 이유도 한 가지여야 한다는 것이다.

변경되어야 하는 이유가 한 가지여야 한다. -> 그러면 같은 이유로 변경되어야 하는 코드들을 모으고, 다른 이유로 변경되어야 하는 코드들을 흩어라.

**한 개의 함수는 한 가지 역할만을 수행하도록 구현하자**

- `이것은 소프트웨어 엔지니어링에서 단연코 가장 중요한 규칙`
- 한 가지 이상의 역할을 수행하는 함수는 테스트 및 추론하기 어려워진다.

함수를 명확한 작은 함수들로 쪼개면, 어떤 장점이 생기냐?

`이 함수는 틀릴 수가 없는 함수다`라는 함수가 많아지면서 **문제가 발생했을 때 봐야하는 코드의 양이 줄어든다.** 함수형 프로그래밍 관점에서 보면 대부분 버그가 액션에서 발생할 가능성이 높은데, 액션을 최대한 계산j과 데이터로 분리하면 검증할 액션 자체가 lean해진다는 의미 아닐까?

그런데 그러면 나도 그렇고 많은 초보 개발자들의 의문은 이것일 것이다.

`어디까지 쪼개야 함? 뭐 진짜 잘게잘게 하나하나 다 분리해야하나?`

우선, 함수를 조립하기 위한 매개변수로 쓰일 수 있는 기능단위는 쪼개서 분리하는게 좋다.

- filter에 들어갈 조건 판별 함수
- forEach에 들어갈 동작을 하는 side-effect함수
- map에 들어가는 project함수
- sort에 들어가는 정렬을 나타내는 함수

하지만 너무 잘개 쪼개는 것이 항상 능사가 아닌것은 당연하지? 그래서 이런 애매모호한 상황들에 대해서 어떻게 판단할지가 어렵기 때문에 소프트웨어 개발이 어렵다.

이럴 때는 왜 이런 함수 쪼개기를 하는가에 대해서 다시금 생각해보는 것이 좋을 수도 있다.

- 가독성
- 응집도
- 유지보수성
- 재사용성 및 재사용 가능성

등 요소들을 고려해서 적절하게 쪼개는 노력이 필요하다. 처음엔 어렵겠지만 많은 고민을 하고 시행착오를 겪다보면 나아지겠지.

하나더!! 함수형 프로그래밍의 순수함수 개념은 SRP원칙에 가장 부합하는 형태이다. 가급적 순수함수를 활용해서 개발하는 함수형 프로그래밍의 핵심은 SRP와 함께 연계해서 고려하자.

## O - OCP `Open/Closed Principle`, 개방 폐쇄 원칙

직관적 이해를 위한 장치 예시

트럭을 만들 때, 뒤에 다양한 운송 수단을 붙일 수 있는 플랫폼을 만들어놓고, 그 플랫폼에 다양한 운송 수단을 붙일 수 있게 만들어놓는 것이다.

그러면 새로운 목적이 필요할 떄 트럭을 다시 만들지 않고 뒤에 달리는 장치만 필요에 따라서 붙이면 된다.

OCP 원칙의 의미는 `새로운 기능의 추가가 필요할때는 기존 코드의 수정 없이 추가가 되어야 하고, 내부 메커니즘이 변경이 되어도 외부 코드에 영향을 주지 않아야 한다.` 라는 것이다.

함수형 프로그래밍에서 이 OCP를 가장 잘 보여주는 예시는 바로 `고차함수`이다.

map, filter, reduce 등의 고차함수는 내부적으로 어떤 로직이든 변경되더라도 외부 코드에 영향을 주지 않는다. 그래서 이런 고차함수들은 OCP를 잘 지키고 있다고 볼 수 있다. (배열에 대해서 전달된 함수를 기준으로 특정한 역할을 처리하는 형태, 어떤 값이 전달되는지에 따라서 추가적인 로직 구현이 필요한 형태가 아니고, 변형은 전달되는 함수안에서 처리할 수있음. 즉 확장적 기능 활용에는 열려있고, 특정한 역할 자체를 변경하는 것은 안된다. open to extension, closed to modification.)

OCP 원칙은 함수형 개발의 설계에서 매주 중요하다. **버그 수정이 아닌 새로운 기능을 개발할 때 기존 코드를 수정하지 않고 새로운 코드를 추가하는 것이 중요하다. 기존 개발된 함수를 수정하면서 코드를 개발하고 있다면 OCP원칙을 위배하고 있을 가능성이 엄청 높다.**

이해가 잘 되지 않는 부분들이 있어서 자료를 더 찾다가 도움이 되는 자료를 찾았음.

[Open–Closed Principle in Functional TypeScript](https://alexnault.dev/open-closed-principle-in-functional-typescript)

- the ulitmate goal of OCP is **to write code that won't need to change when requirements change**
  - 조금 더 깊게 들어가면, 변경의 가능성이 큰 코드인지 아닌지 분류하는 것 부터 시작되어야 할 듯 하다. 그리고 변경 가능성이 큰 코드는 이런 부분을 더 신경써서 설계를 하는 경험 및 지식이 필요한 듯.
- in functional programming, OCP typically translates to composition

## L - LSP `Liskov Substitution Principle`, 리스코프 치환 원칙

[The Liskov Substitution Principle (LSP) in Frontend](https://www.linkedin.com/pulse/liskov-substitution-principle-lsp-frontend-prithveesh-goel/)

If S is a subtype of T, the objects of type T should be able to be replaced by objects of type S without altering the desired behavior of the program.

프론트엔드 영역에서 리스코프 치환 원칙은 base component를 기반으로 만들어진 derived component는 어떤 상황에서도 앱을 터트리거나 의도하지 않은 동작이 없이 base component 를 대체할 수 있어야 함을 말한다.

### 그러기 위해서는...

derived component가 base component를 대체할 수 있기 위해서는...

- should support same props, methods, expected behavior of the base component.
- while adding some custom feature that the base component does not offer

### 근데 이게 프론트엔드 코드 작성에 있어서 뭐가 좋은데??

Base component로 만들어진 컴포넌트로 Base component를 대체할 수 있도록 구현함으로써,

- 하나의 위계질서(base-derived로 이루어진 구조를 말하는 듯)로 이루어진 컴포넌트들은 서로 쉽게 상호교환될 수 있다.
  - 그러므로, 재사용성, 모듈성 그리고 유지보수성 증대로 이어진다.
- **이 원칙은 정해진 규칙/형태를 기반으로 하는 컴포넌트들을 만들도록 encourage하는 효과가 있다.**

### LSP에 대한 흔한 오해

**`LSP는 상속에 대한 원칙이다.`라는 것은 오해다.**

상속은 컴포넌트 간 관계를 확립하는 하나의 방법일 뿐이다.

LSP의 본질은 프로그램에 문제를 일으키지 않고 같은 위계에 속한 두 구성요소를 상호 교체할 수 있어야 한다이다.

이는 interface나 composition에도 똑같이 적용됨을 의미한다.

**`Base component는 무조건 항상 언제나 어떤 컨텍스트에서도 subcomponent와 상호교체될 수 있어야 한다.`는 오해다.**

Base컴포넌트를 사용할 수 있는 컨텍스트에 한해서, subcomponent로 대체할 수 있어야 한다는 의미이다.

Sub component가 컨텍스트 상 필요한 기능을 가지는 것은 가장 본질적인 형태의 LSP 원칙(Base component의 필수 구성 요소, 구조를 가지는)을 지키는 범위 내에서는 필요하다면 적용해야 한다.

**`LSP는 꼭 지켜야하는 만고불변의 진리이자 절대원칙이다`는 오해다.**

엄격한 규칙이라기 보다는, 가이드라인으로 이해되어야 한다.

이를 지키기 위해서 노력하는 것이 코드 품질 개선에 도움이 되는 것은 맞지만, 상황에 따라서 적절하지 않을수도 있고 더 나은 접근법들이 있을 수 있다.

`It is essential to assess the trade-offs and consider practical implications`

### AHA Point

`This principle encourages the creation of components that follow a consistent contract, making it easier to reason about and work with different components throughout the application.`

컴포넌트를 맞춰서 잘 만들면 좋다 정도로만 어렴풋이 생각하고 있었는데, 그렇게 해야되는 이유 중 하나는 바로 일관성 있는 코드 작성, 코드 형태에 있다는 점을 명시적으로 읽으니 느낌이 조금 다르다.

왜? 왜 비슷한 컴포넌트를 기본 구조를 가진 컴포넌트를 확장하는 형태로 작성하는게 좋은데? 라고 했을 때 오늘 전까지는 이렇게 대답했지 싶다.

- 코드 이해하기가 더 좋아서요.
- 그게 그냥 더 좋아보여서요....
- 그냥 남들이 그게 좋다고 하던데...

하지만 그 이면에는 이런 구체적인 이유들이 존재했다는 점

- 필요한 경우에 특정 컴포넌트를 같은 hierarchy에 존재하는 컴포넌트로 상대적으로 쉽게 교체할 수 있다.
- 특정 컴포넌트가 가장 기본적으로 수행해야되는 기능에 대해서 이해할 수 있다.
- 기준이 되는 코드가 존재하기 때문에, 그 코드를 확장하는 형태로 코드를 작성할 수 있다.
  - 기본 기능이 깨지지 않을 가능성이 커진다.
  - 기능 추가에 소요되는 시간이 줄어든다.
  - 특정 컴포넌트를 사용할 때, 예측 가능한 base가 존재한다.
  - 코드를 수정할 때 함께 수정해야되는 일이 생긴다면 비교적 더 간편하고 안정적이다.
- 새롭게 추가된 기능/UI가 기본적으로 갖춰야할 형태를 갖추고 있기 때문에 일관된 UXUI를 제공하는데 도움이 된다.
- 협업하는 사람들이 서로 다른 이해를 기반으로 상황에 맞지 않거나 기존 코드베이스와 결이 다른 코드를 작성하는 것을 방지할 수 있다.
- 테스팅
  - derived component는 base component에 해당되는 테스트케이스를 기반으로 테스팅이 가능하다.
