# SHOP-PROJECT

# 환경 변수

MYSQL_USERNAME

MYSQL_PASSWORD

MYSQL_DATABASE

MYSQL_HOST

SECRET_KEY 


# API명세서
https://docs.google.com/spreadsheets/d/1i-sFWhI17blxNwCTZaP3Ao13jcC1k51CrOcNhZ0AWiQ/edit?usp=sharing

엑셀 사용이 미숙해서 앞에 category, description, method, url만 작성햇습니다.

# ERD
https://www.erdcloud.com/d/GeFeNXdTFYRLLxccY

# 암호화 방식
Q. 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 단방향 암호화와 양방향 암호화 중 어떤 암호화 방식에 해당할까요?
비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?

A. 해쉬 값은 단방향 암호와 방식이고, DB가 노출 되었을 시 민감한정보(password)가 직접적으로 노출 되지 않기 때문에 좋다.
-> 저는 crypto 모듈을 사용했습니다.

# 인증 방식
Q. JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?
해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?

A. JWT안에 사용자의 정보가 담겨있어 보안에 취약하다. RFRESH TOKEN을 같이 발급하여 유효기간을 짧게 설정해준다.

# 인증과 인가
Q. 인증과 인가가 무엇인지 각각 설명해 주세요.
과제에서 구현한 Middleware는 인증에 해당하나요? 인가에 해당하나요? 그 이유도 알려주세요.

A. 인증은 사용자를 확인 하는 것이고, 인가는 그 사용자의 권한에 대한 것이다. Middleware는 인가에 해당하는 것 같다.
이유는 뭔가에 대해 수행할 때 권한을 확인하는 기능을 하기 때문이다.

# Http Status Code
Q. 과제를 진행하면서 사용한 Http Status Code를 모두 나열하고, 각각이 의미하는 것과 어떤 상황에 사용했는지 작성해 주세요.

A. 성공에 관련된 상태 코드는 200번대, 실패에 관련된 코드는 400 번대,
생성 201 이거말고는 모르겠습니다.

# 리팩토링
Q. MongoDB, Mongoose를 이용해 구현되었던 코드를 MySQL, Sequelize로 변경하면서, 많은 코드 변경이 있었나요? 주로 어떤 코드에서 변경이 있었나요?
만약 이렇게 DB를 변경하는 경우가 또 발생했을 때, 코드 변경을 보다 쉽게 하려면 어떻게 코드를 작성하면 좋을 지 생각나는 방식이 있나요? 있다면 작성해 주세요.

A. 크게 변한건 없는 것 같다. model 설정이랑 schema 설정에서 차이나는 점과, find()에서 where를 쓰는 것이 달라진 것 같다.

# 서버 장애 복구
Q. 현재는 PM2를 이용해 Express 서버의 구동이 종료 되었을 때에 Express 서버를 재실행 시켜 장애를 복구하고 있습니다. 만약 단순히 Express 서버가 종료 된 것이 아니라, AWS EC2 인스턴스(VM, 서버 컴퓨터)가 재시작 된다면, Express 서버는 재실행되지 않을 겁니다. AWS EC2 인스턴스가 재시작 된 후에도 자동으로 Express 서버를 실행할 수 있게 하려면 어떤 조치를 취해야 할까요? (Hint: PM2에서 제공하는 기능 중 하나입니다.)

A. PM2의 기능중 startup을 사용하면 부팅시 자동으로 실행 시켜준다.
pm2 startup으로 부팅 시스템에 등록할 수 있다.

# 개발 환경
Q. nodemon은 어떤 역할을 하는 패키지이며, 사용했을 때 어떤 점이 달라졌나요?
npm을 이용해서 패키지를 설치하는 방법은 크게 일반, 글로벌(--global, -g), 개발용(--save-dev, -D)으로 3가지가 있습니다. 각각의 차이점을 설명하고, nodemon은 어떤 옵션으로 설치해야 될까요?

A. nodemon은 코드를 작성하는 중에 변경사항을 저장하면 자동으로 서버를 재실행 시켜준다. 글로벌은 시스템 폴터에 패키지를 설치하고, 개발용은
프로젝트 node_moudles에 설치한다. nodemon은 개발환경에서 쓰기 때문에 개발용으로 설치 해줘야 한다.
