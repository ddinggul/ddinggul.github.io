# 관리자 페이지 (Decap CMS) 설정 가이드

이 가이드는 웹 브라우저에서 블로그 포스트를 작성하고 사이트 콘텐츠를 관리할 수 있는 관리자 페이지를 설정하는 방법을 안내합니다.

## 📋 목차
1. [GitHub OAuth App 생성](#1-github-oauth-app-생성)
2. [Netlify Identity 설정 (간편한 방법)](#2-netlify-identity-설정-간편한-방법)
3. [CMS 접속 및 사용](#3-cms-접속-및-사용)
4. [문제 해결](#4-문제-해결)

---

## 1. GitHub OAuth App 생성

### 방법 A: Netlify로 간편하게 (추천) ⭐

가장 간단한 방법은 Netlify Identity를 사용하는 것입니다.

1. **Netlify 계정 생성** (무료)
   - https://www.netlify.com/ 접속
   - GitHub 계정으로 가입

2. **새 사이트 추가**
   - "Import from Git" 클릭
   - GitHub 연결
   - `ddinggul/ddinggul.github.io` 저장소 선택
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Deploy!

3. **Identity 활성화**
   - 사이트 대시보드 → Settings → Identity → Enable Identity
   - Registration → Invite only (본인만)
   - Services → Git Gateway 활성화

4. **본인을 사용자로 초대**
   - Identity 탭 → Invite users
   - 본인 이메일 입력
   - 이메일로 온 초대장 수락

5. **config.yml 업데이트**

   `public/admin/config.yml` 파일을 다음과 같이 수정:

   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```

완료! 이제 `/admin`에서 로그인할 수 있습니다.

---

### 방법 B: GitHub OAuth 직접 설정 (고급)

Netlify를 사용하지 않고 GitHub OAuth를 직접 설정하려면:

#### 1단계: GitHub OAuth App 생성

1. GitHub 접속 → Settings (우측 상단 프로필)

2. 왼쪽 메뉴에서 **Developer settings** 클릭

3. **OAuth Apps** 클릭

4. **New OAuth App** 클릭

5. 정보 입력:
   ```
   Application name: Junseo Blog CMS
   Homepage URL: https://ddinggul.github.io
   Application description: CMS for my personal blog
   Authorization callback URL: https://api.netlify.com/auth/done
   ```

6. **Register application** 클릭

7. **Client ID** 복사 (나중에 사용)

8. **Generate a new client secret** 클릭 → **Client Secret** 복사 (안전한 곳에 보관)

#### 2단계: Netlify에 OAuth 정보 연결

Netlify를 인증 게이트웨이로 사용:

1. Netlify 사이트 대시보드

2. **Site settings** → **Access control** → **OAuth**

3. **Install provider** 클릭

4. **GitHub** 선택

5. 위에서 복사한 Client ID와 Client Secret 입력

6. **Install** 클릭

---

## 2. Netlify Identity 설정 (간편한 방법)

이미 위의 "방법 A"를 따랐다면 완료입니다!

config.yml이 다음과 같이 설정되어 있는지 확인:

```yaml
backend:
  name: git-gateway
  branch: main
```

---

## 3. CMS 접속 및 사용

### 첫 로그인

1. **사이트 배포 확인**
   - GitHub에 push 후 Actions 탭에서 배포 완료 확인
   - `https://ddinggul.github.io` 접속 가능 확인

2. **관리자 페이지 접속**
   ```
   https://ddinggul.github.io/admin
   ```

3. **로그인**
   - "Login with Netlify Identity" 클릭
   - 이메일/비밀번호 입력 (Netlify Identity로 초대받은 계정)

4. **CMS 대시보드 진입** 🎉

### 블로그 포스트 작성

1. 좌측 메뉴에서 **"Blog Posts"** 클릭

2. **"New Blog Post"** 클릭

3. 정보 입력:
   - Title: 포스트 제목
   - Description: 간단한 설명
   - Publish Date: 발행 날짜
   - Tags: 태그 (엔터로 추가)
   - Body: 마크다운으로 본문 작성

4. 우측 상단에서:
   - **Save**: 초안 저장 (아직 배포 안 됨)
   - **Publish**: 즉시 발행 (자동으로 Git commit & 배포)

### 기존 포스트 수정

1. Blog Posts 목록에서 수정할 포스트 클릭

2. 내용 수정

3. **Publish** → **Publish now** 클릭

4. 2-3분 후 사이트에 반영

### 페이지 편집 (About, CV, Contact)

1. 좌측 메뉴에서 **"Pages"** 클릭

2. 수정할 페이지 선택 (About Page, CV Page, Contact Page)

3. 내용 수정 후 Publish

### 프로젝트 관리

1. **"Projects"** 클릭

2. **"New Project"** 클릭

3. 프로젝트 정보 입력:
   - Title: 프로젝트 이름
   - Description: 설명
   - Stack: 사용 기술 (여러 개 추가 가능)
   - Status: Active / In Progress / Experimental
   - Category: Research / Application
   - GitHub URL / Demo URL (선택)

4. Publish

### 이미지 업로드

1. 본문 작성 중 이미지 아이콘 클릭

2. 이미지 선택 또는 드래그 & 드롭

3. 자동으로 `/images/uploads/` 폴더에 업로드

4. 마크다운에 이미지 경로 자동 삽입

---

## 4. 문제 해결

### "Failed to load entries" 에러

**원인**: Git Gateway가 활성화되지 않음

**해결**:
1. Netlify 대시보드 → Identity → Services
2. Git Gateway "Enable" 클릭

### "You don't have access to this repo" 에러

**원인**: GitHub 계정이 저장소 권한이 없음

**해결**:
- `ddinggul` 계정으로 로그인했는지 확인
- Repository가 `ddinggul/ddinggul.github.io`인지 확인

### 변경사항이 사이트에 반영되지 않음

**원인**: GitHub Actions 빌드가 완료되지 않음

**해결**:
1. GitHub 저장소 → Actions 탭
2. 최신 workflow 실행 확인
3. 완료까지 2-3분 대기

### 로그인이 안 됨

**원인**: Netlify Identity에 초대되지 않음

**해결**:
1. Netlify 대시보드 → Identity
2. "Invite users" 클릭
3. 본인 이메일로 초대
4. 이메일의 초대 링크 클릭

### Editorial Workflow가 뭔가요?

**설명**:
- **Save**: 초안으로 저장 (아직 배포 안 됨, 브랜치에 저장)
- **Set status → Ready**: 검토 준비 완료
- **Publish**: main 브랜치에 병합 & 배포

**간단히 사용하려면**:
- 바로 Publish 클릭하면 즉시 배포됩니다!

---

## 5. 보안 참고사항

### 본인만 접근 가능한 이유

1. **Netlify Identity**:
   - 본인 이메일만 초대
   - 다른 사람은 로그인 불가

2. **Repository 권한**:
   - `ddinggul/ddinggul.github.io`는 본인 소유
   - 다른 사람은 write 권한 없음

3. **Git Gateway**:
   - Netlify가 GitHub API를 통해 commit
   - 모든 commit은 본인 계정으로 기록

### 추가 보안 강화 (선택)

1. **Two-Factor Authentication (2FA)**
   - GitHub Settings → Security → Enable 2FA

2. **Branch Protection**
   - Repository Settings → Branches
   - main branch에 protection rule 추가

3. **Commit Signing**
   - GPG 키로 commit에 서명
   - 위조 방지

---

## 6. CMS 사용 팁

### 마크다운 단축키

- `Ctrl+B` / `Cmd+B`: **Bold**
- `Ctrl+I` / `Cmd+I`: *Italic*
- `Ctrl+K` / `Cmd+K`: [Link]
- 코드 블록: ` ```언어명 `

### 미리보기

- 우측 패널에서 실시간 미리보기 가능
- 실제 사이트 렌더링과 유사

### 초안 관리

- Draft를 `true`로 설정하면 사이트에 표시 안 됨
- 나중에 `false`로 변경 후 Publish

### 태그 활용

- 일관된 태그명 사용 (예: phonetics, ai, research)
- 소문자, 하이픈 사용 권장

---

## 요약

✅ **설정**: Netlify Identity + Git Gateway (5분)
✅ **로그인**: `/admin` → Netlify 계정
✅ **글쓰기**: Blog Posts → New → 작성 → Publish
✅ **배포**: 자동 (2-3분 소요)
✅ **보안**: 본인 계정만 접근 가능

**관리자 페이지**: https://ddinggul.github.io/admin
**도움이 필요하면**: GitHub Issues에 문의하세요!

Happy blogging! 🚀✍️
