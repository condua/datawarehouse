import React, { useState } from 'react';
import '../scss/pages/Quiz.scss'
const initialQuestions = [
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
    question: "Cổng thông tin đa năng là gì ?",
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

  // ... thêm các câu hỏi khác tương tự
];

function Quiz() {
  const [currentQuestions, setCurrentQuestions] = useState(initialQuestions);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);

  const currentQuestion = currentQuestions.find(q => q.id === currentQuestionId);

  const checkAnswer = (option) => {
    const updatedQuestions = currentQuestions.map(q => {
      if (q.id === currentQuestionId) {
        return { 
          ...q, 
          userAnswer: option, 
          isCorrect: option === q.correct 
        };
      }
      return q;
    });
    setCurrentQuestions(updatedQuestions);
  };

  return (
    <div className='Quiz'>
      <div className='container'>
        <div className='content'>
          {currentQuestion && (
            <div>
              <p style={{marginTop:'30px',marginBottom:'0px'}}>{currentQuestion.question}</p>
              <div className='answer'>
              {currentQuestion.answers.map((option, index) => (
                <div className='answer-detail'
                  key={index}
                  onClick={() => checkAnswer(option)}
                  style={{

                    backgroundColor: 
                      currentQuestion.userAnswer === option
                        ? currentQuestion.isCorrect === true
                          ? 'green'
                          : 'red'
                        : 'transparent',
                  }}
                >
                  {option}
                </div>
              ))}
              </div>
            </div>
          )}
        </div>
        <div className='questions-id'>
          {currentQuestions.map(q => (
            <div className='questions-id-detail' key={q.id} onClick={() => setCurrentQuestionId(q.id)}>
              <span style={{ color: q.isCorrect ? 'green' : q.isCorrect === false ? 'red' : 'black' }}>
                {q.isCorrect 
                ? '✔️' 
                : q.isCorrect === false
                 ? '❌'
                 : ''
              
                }
              </span>
              Quiz {q.id}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Quiz;
