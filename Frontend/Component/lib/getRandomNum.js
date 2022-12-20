/** 
 * mode home에서 공개된 image 데이터를 랜덤으로 추출해 배경화면으로 사용하기 위한 함수
*/

const getRandomNum = (num) => {
     return Math.floor(Math.random() * num);
   }; 

export default getRandomNum