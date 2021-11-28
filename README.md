# 엘리스 직업심리검사 서비스 프로젝트

직업심리검사서비스 프로젝트 입니다.

- **검사 시작 시, 유저 설정**
    `**필수**`
     
    - [x] 이름을 입력할 수 있는 input form을 구현합니다.    
    - [X] 성별을 선택할 수 있는 input form을 구현합니다.    
    - [x] 이름 혹은 성별을 기입하지 않거나 선택하지 않을 경우 검사 시작 버튼이 비활성화 되어야 합니다.    
    
    **`선택`** 
    
    - [x] 이름을 올바르게 입력하지 않았을 경우, 이에 대한 안내 메세지를 출력합니다.     
    - [x] 성별을 선택하지 않았을 경우, 이에 대한 안내 메세지를 출력합니다.
- **검사 예시 페이지**
    
    `**필수**`
    
    - [x] 검사를 시작하기 전 앞으로의 진행 방식에 대해서 설명하는 페이지를 구현합니다.        
    - [x] 진행 방식에 대한 검사 예제 문항이 한 문항을 화면에 표시합니다.        
    - [x] 검사 시작 버튼을 구현합니다.        
    
    **`선택`** 
    
    - [x] 검사 예제 문항을 진행하지 않으면 검사 시작 버튼이 비활성화 되어야 합니다.         
    - [x] 검사 예시 페이지부터는 진행 표시줄(Progress bar)가 포함 되어야 있어야 하며, 검사 예시 페이지는 0%로 측정되어야 합니다.(진행 표시줄의 형태는 무관합니다.)     
- **검사 진행 페이지**
    
    `**필수**`
    
    - [X] 페이지 당 5개의 문항이 보여야 합니다.     
    - [x] 페이지 내 문항을 모두 진행하기 전까지는 "다음" 버튼이 비활성화 상태여야 합니다.     
    
    **`선택`** 
    
    - [x] 각 문항을 선택할 때 마다 진행 표시줄과 퍼센트(%)가 갱신되어야 합니다.       
    - [x] "이전" 버튼을 클릭했을 때, 이전 페이지 문항에서 선택한 값이 유지된 상태여야 합니다.       
- **검사 완료 페이지**
    
    `**필수**`
    
    - [x] 검사가 완료되었다는 문구를 포함해야 하며, 검사결과에 대한 간단한 문장을 포함해야 합니다.        
        - Ex) 사용자는 XX 성향이므로 XX 직업에 적합합니다.  
- **결과표 페이지**
    
    `**필수**`
    
    - [x] 유저의 기본 정보를 포함해야 합니다. (이름, 성별, 검사일)      
    - [x] 직업가치관결과에 대하여 항목 별로 수치를 표기해야 합니다. (ex. 막대 그래프)       
    - [x] 가치관과 관련이 높은 직업을 결과에 따라 분류하여 표기해야 합니다.     
    - [x] "다시 검사하기" 버튼 클릭 시, 진행했던 항목에 대한 기록은 모두 초기화되어야 합니다.