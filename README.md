# CMP Processing Team06 Project

## Credits
- 202011111 Yu-mi Jun

## Git

### Steps for using git
1. cmp_processing 프로젝트 폴더에서 `git branch` 명령어를 통해서 * main 이라는 출력 메시지를 확인한 후, origin/main 브랜치의 커밋을 받아오기 위해 `git pull` 명령어를 입력 한다.
2. `git checkout -b feature/<기능이름>` 와 같이 명령어를 입력한 후, 기능 구현이 완료 되면 `git push -u origin <branchname>` 을 통해서 원격 저장소에 push를 한다. 
3. Github 웹 페이지에 접속하여, Pull Request(PR)를 작성한다. (reviewer 에 리뷰할 사람 등록)
4. 요청한 PR이 main 브랜치에 반영되면, `git checkout main` 명령어를 통해서 main 브랜치로 이동한 후, `git branch -d feature/<기능이름>` 명령어를 통해서 구현이 완료된 브랜치를 삭제한다.
5. `git pull` 명령어를 통해서 origin의 내용을 로컬에 반영한다.

### Reference related to git
- [직관적으로 이해하는 git & GitHub](https://deepinsight.tistory.com/78)
- [다른 사람의 원격 저장소로부터 협업하는 방법](https://deepinsight.tistory.com/167)
