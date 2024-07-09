import React, { useState, useEffect } from 'react';
import Question from './Question';
import { firestore } from '../firebase';
import { collection, addDoc, setDoc, doc  } from 'firebase/firestore'; // Required Firestore methods
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";

import '../scss/pages/QuizKahoot.scss'



const QuizKahoot = ({ playerName, playerMssv }) => {
  // Tạo một useState để ghi nhớ điểm
  const [score, setScore] = useState(0);
  // Ghi nhớ câu hỏi hiện tại
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [name,setName] = useState();
  const navigate = useNavigate();
  console.log("Tên: " + playerName);
  console.log("MSSV: " + playerMssv);
  // Tạo Danh sách câu hỏi và câu trả lời 
  const questions = [
        {
        id: 1,
        question: "Câu 1: Công ty nào thành công ở hình thức bán hàng trực tuyến ?",
        answers: ["A. Amazon"
        , "B. Dell"
        , "C. Nike"
        , "D. FedEx"],
        correct: "A. Amazon",
        isCorrect: null,
        userAnswer: null,
    },
    {
        id: 2,
        question: "Câu 2: Khó khăn gặp phải của công ty bán hàng hình thức hỗn hợp (Omni-channel)",
        answers: ["A. Chi phí mặt bằng và nhân viên lớn"
        , "B. Chi phí quảng bá trên môi trường mạng"
        , "C. Chi phí in catalogue quảng bá lớn"
        , "D. Điều phối giá cả giữa các hình thức"],
        correct: "D. Điều phối giá cả giữa các hình thức",
        isCorrect: null,
        userAnswer: null,
    },
    {
        id: 3,
        question: "Câu 3: Đâu là đặc điểm của doanh nghiệp tài chính thuần online ?",
        answers: ["A. Có sự hiện diện vật lý"
        , "B. Phát triển nhanh"
        , "C. Có thể cung cấp tất cả mọi dịch vụ"
        , "D. Cồng kềnh"],
        correct: "B. Phát triển nhanh",
        isCorrect: null,
        userAnswer: null,
    },
    {
        id: 4,
        question: "Câu 4: Trong ngành du lịch trực tuyến, lĩnh vực nào đem lại nguồn doanh thu lớn nhất ?",
        answers: ["A. Vé máy bay"
        , "B. Dịch vụ thuê ô tô"
        , "C. Đặt phòng khách sạn"
        , "D. Các gói du lịch"],
        correct: "A. Vé máy bay",
        isCorrect: null,
        userAnswer: null,
    },
    {
        id: 5,
        question: "Câu 5: Trong thời đại dịch bệnh Covid-19, xu hướng tuyển dụng nào đã được sử dụng là chủ yếu ?",
        answers: ["A. Tuyển dụng xã hội"
        , "B. Tuyển dụng bằng video, từ xa"
        , "C. Công cụ tìm kiếm, tổng hợp việc làm"
        , "D. Phân tích dữ liệu, trí tuệ nhân tạo và thuật toán"],
        correct: "B. Tuyển dụng bằng video, từ xa",
        isCorrect: null,
        userAnswer: null,
    },
    {
        id: 6,
        question: "Câu 6: Mô hình kinh doanh “A la carte” của các doanh nghiệp cung cấp nội dung trực tuyến hoạt động trên nguyên tắc:",
        answers: ["A. Đăng ký"
        , "B. Trả tiền cho những gì bạn sử dụng"
        , "C. Miễn phí, lấy doanh thu từ quảng cáo hoặc gói premium"
        , "D. Tất cả đều sai"],
        correct: "B. Trả tiền cho những gì bạn sử dụng",
        isCorrect: null,
        userAnswer: null,
    },
    {
        id: 7,
        question: "Câu 7: Thứ tự đúng các giai đoạn phát triển của ngành báo chí",
        answers: ["A. Integrated Print/ Web → Print Centric → Digital First"
        , "B. Print Centric → Digital First → Integrated Print/ Web"
        , "C. Print Centric → Integrated Print/ Web → Digital First"
        , "D. Digital First → Integrated Print/ Web -> Print Centric"],
        correct: "C. Print Centric → Integrated Print/ Web → Digital First",
        isCorrect: null,
        userAnswer: null,
    },
    {
        id: 8,
        question: "Câu 8: Đâu không  là một loại mạng xã hội và cộng đồng trực tuyến ?",
        answers: ["A. General communities"
        , "B. Interest-based communities"
        , "C. Practice networks"
        , "D. Enterprise communities"],
        correct: "D. Enterprise communities",
        isCorrect: null,
        userAnswer: null,
    },
    {
        id: 9,
        question: "Câu 9: Cổng thông tin đa năng là gì ?",
        answers: ["A. Là các cổng thông tin trợ giúp nhân viên hoặc thành viên điều hướng đến nội dung quan trọng như tin tức công ty hoặc tổ chức thông báo."
        , "B.Là các cổng thông tin cung cấp công cụ tìm kiếm, email, trò chuyện, bảng thông báo và các thông tin thời sự, sức khỏe, giáo dục"
        , "C. Là các cổng thông tin cung cấp các nội dung chuyên biệt và dành cho các cộng đồng có cùng sở thích"
        , "D. Là các cổng thông tin cung cấp nội dung như tỷ số thể thao, mã chứng khoán, mẹo về sức khỏe, tin nhắn tức thời, thông tin ô tô và đấu giá"],
        correct: "B.Là các cổng thông tin cung cấp công cụ tìm kiếm, email, trò chuyện, bảng thông báo và các thông tin thời sự, sức khỏe, giáo dục",
        isCorrect: null,
        userAnswer: null,
    },
    {
        id: 10,
        question: "Câu 10: Đâu không là một loại cổng thông tin ?",
        answers:["A. Cổng thông tin doanh nghiệp"
        ,"B. Cổng đa năng"
        ,"C. Vortal (Vertical market portal)"
        ,"D. Hortal (Horizontal market portal)"],
        correct: "D. Hortal (Horizontal market portal)",
        isCorrect: null,
        useAnswer: null,
    },
  ];

  // hàm xử lý câu trả lời
  // nếu câu trả lời đúng thì điểm sẽ + ceil(1000 * timeLeft/ số giây)
  const handleAnswer = (answer, timeLeft) => {
    if (answer === questions[currentQuestion].correct) {
      const pointsToAdd = Math.ceil(1000 * timeLeft / 30); // thời gian cho phép mỗi câu là 15 giây
      setScore(prevScore => prevScore + pointsToAdd); // cập nhật điểm
    }
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
    console.log('handleAnswer called with', answer);
  };
  useEffect(() => {
      // if (currentQuestion === questions.length) {
      const firebaseConfig = {
        apiKey: "AIzaSyAsbuHaW8UYeHMz7JutxkxOWtIwVgwTDYY",
        authDomain: "data-warehouse-18412.firebaseapp.com",
        projectId: "data-warehouse-18412",
        storageBucket: "data-warehouse-18412.appspot.com",
        messagingSenderId: "1038654617127",
        appId: "1:1038654617127:web:d4495499760424163f0002",
        measurementId: "G-Z6148P6K2F"
      };
    
      // Khởi tạo Firebase
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      const mssvRef = doc(firestore, 'names', playerMssv);

      // Cập nhật điểm số cho người chơi dựa trên playerMssv
      setDoc(mssvRef, { score }, { merge: true });
      // Lấy dữ liệu từ Firestore
  }, [currentQuestion, playerMssv, score]);

  return (
    <div>
    
      {/* <h1>Quiz</h1> */}
      {currentQuestion < questions.length ? (
        <Question 
          data={questions[currentQuestion]}
          handleAnswer={handleAnswer}
        />
      ) : (
        <div className='QuizKahoot' style={{width:'100%',height:'81vh',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          <p>Điểm số của bạn là: {score}</p>
          <button onClick={()=>{navigate('/ranking')}} style={{padding:'20px',borderRadius:'30px',cursor:'pointer'}}>Click here to view ranking </button>

          {/* <button onClick={()=>{}}>handleSubmit</button> */}
        </div>
      )}
    </div>
  );
};

export default QuizKahoot;
