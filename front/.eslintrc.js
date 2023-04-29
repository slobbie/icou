module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    // 이스케이프를 피하기 위해 문자열에 작은 따옴표 를 사용합니다.
    quotes: [2, 'single'],
    // prettier 규칙을 사용 합니다.
    'prettier/prettier': 0,
    // 뒤쪽에 쉼표는 허용하지 않습니다.
    'comma-dangle': 'off',
    // 세미콜론은 사용하지 않습니다.
    // semi: ['error', ''],
    // 공백과 탭을 섞어서 사용하지 말아야 합니다.
    'no-mixed-spaces-and-tabs': 2,
    // 탭 사용 안됨
    'no-tabs': 2,
    // 사용하지 않는 변수를 정의하지 마세요.
    'no-unused-vars': 1,
    // 들여쓰기시 2칸 공백사용 을 사용합니다
    indent: ['error', 2, {SwitchCase: 1}],
    // 중괄호 간격 유지
    'object-curly-spacing': 0,
    // 빈 블록 문을 허용 하지 않습니다.
    'no-empty': 1,
    // 괄호 안에 공백이 없어야 합니다.
    'space-in-parens': 1,
    // 블록 앞에 공간이 있어야 합니다.
    'space-before-blocks': 2,
    // 줄 끝에서 공백을 사용할 수 없습니다.
    'no-trailing-spaces': 2,
    // 예약어 뒤에는 공백을 추가합니다.
    'keyword-spacing': 2,
    // 함수 선언 괄호 앞에 공백을 추가합니다.
    'space-before-function-paren': 2,
    // == --> === 사용
    eqeqeq: 2,
    // 공백사이에 연산자를 넣어주세요.
    'space-infix-ops': 2,
    // 쉽표 뒤에 공백 이 있어야 합니다.
    'comma-spacing': 2,
    // 여러줄의 if 문을 사용할 경우 중괄호 사용
    curly: 2,
    // 여러 줄의 공백을 허용하지 않습니다.
    'no-multiple-empty-lines': 2,
    // 함수식별자와 호출 사이에 공백은 없어야 합니다.
    'func-call-spacing': 2,
    // 콜론과 키 값 쌍의 값 사이에 공백을 추가해야 합니다.
    'key-spacing': 2,
    // 생성자 이름은 대문자로 시작
    'new-cap': 0,
    // 모듈 당 하나의 import 문을 사용
    'no-duplicate-imports': 2,
    // jsx 상에서 인라인 스타일 사용
    'react-native/no-inline-styles': 0,
  },
};
