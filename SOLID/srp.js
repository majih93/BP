const database = {
  lookup: (client) => {
    console.log("get client data from server");
    return {
      isActive: () => {
        return true;
      },
    };
  },
};

const email = (client) => {
  console.log("sendEmail to: ", client);
};

// 아래 emailClients함수를 SRP원칙을 참고해서 개선해보자.
function emailClients(clients) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}

// 위 함수는 단일한 책임(역할)을 수행하는가?
// 아니다. 클라이언트 데이터를 조회하고, 클라이언트가 active한지 판단하고, 이메일을 전송하는 작업이 한꺼번에 이루어지고 있다.
// 함수형 프로그래밍 관점에서는 한 액션이 있기때문에 전체 함수가 액션이되어버림
// 클라이언트 목록 조회 함수

// 이메일 전송 함수

// 함수형 프로그래밍에서 배웠던 액션과 데이터 그리고 계산 기준으로 생각해서..

// 클라이언트 목록 조회 함수
function fetchClientRecord(client) {
  return database.lookup(client);
}

function emailClients_refactored(clients) {
  clients.forEach((client) => {
    const clientRecord = fetchClientRecord(client);

    if (clientRecord.isActive()) {
      email(client);
    }
  });
}

// 내 답이랑 실제 제시된 접근법이 조금 다르다.

// 기존 함수 기능을 이렇게 분석했구나.
// 유효한 고객에게 / 이메일을 전송한다.

// 이메일을 전송한다.
// 그 와중에 active여부 판단은 다른 함수에 위임
function emailClients() {
  clients.filter(isActiveClient).forEach(email);
}

// active여부를 판단한다.
function isActiveClient(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}

// 와...
// 일단 기능 위주로 분석하고 쪼개는게 어떤 느낌인지 살짝 엿봤고,
// filter와 forEach를 사용하는 형태에 대해서 편견이 있었다는 점을 인지했고,
// 개선점이 너무 명확해서 놀랍다.
// 이메일 전송 / 데이터 조회 같은 일견 단순하고 명확한 형태도 있지만,
// (유효한 고객에게) / (이메일을 전송)

// 이 기능을 앞 뒤로 쪼개서 수행하는 함수들을 만들었다는 점.
// isActiveClient는 변경될 이유가 기능적으로는 하나 뿐 - 유효한 고객을 판단하는 방법 변경 시
// emailClients는 변경될 이유가 기능적으로는 하나 뿐 - 이메일을 전송하는 함수나 방법이 변경될 때

// 물론 어거지로 하면 더 있을 수 있지만, 기능적으로 봤을 때 이러해 보인다.
