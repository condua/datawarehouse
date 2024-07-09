import React, { useState, useEffect, useRef } from 'react';
import '../scss/pages/Question.scss'
import tamgiac from '../images/tam giac.png'
import thoi from '../images/thoi.png'
import tron from '../images/tron.png'
import vuong from '../images/vuong.png'
const Question = ({ data, handleAnswer,setName,setMssv }) => {
  const [timer, setTimer] = useState(30);
  const answeredRef = useRef(false); // <-- useRef instead of useState

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(interval);
          if (!answeredRef.current) { // <-- Check if not answered before
            handleAnswer();
            answeredRef.current = true; // <-- Mark as answered
          }
          return 30;  
        }
      });
    }, 1000);

    // Reset for new question
    return () => {
      clearInterval(interval);
      answeredRef.current = false; // <-- Reset the answered state on cleanup
    };
  }, [handleAnswer, data]);

  return (
    <div className='Question'>
      <div className='container'>
        <p>  
          {data.question.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
          ))}
        </p>
        <div className='content'>
                {data.answers.map((answer, index) => {
                    let className = 'answer'; // Lớp cơ bản
                    let logo
                    if (answer.startsWith("A.")){
                      className += ' answer-a';
                      logo = tamgiac
                    } 
                    else if (answer.startsWith("B.")){
                      className += ' answer-b';
                      logo = thoi
                    } 
                    else if (answer.startsWith("C.")) 
                    {
                      className += ' answer-c';
                      logo = tron
                    }

                    else if (answer.startsWith("D.")){
                      className += ' answer-d';
                      logo = vuong
                    } 

                    return (
                        <button className={className} key={index} onClick={() => {
                            if (!answeredRef.current) {
                                answeredRef.current = true;
                                handleAnswer(answer, timer); // <-- pass the timer value
                                setTimer(30); 
                            }
                        }}>
                            <img className='logo' alt='' src={logo} />
                            <h4>{answer}</h4>
                        </button>
                    );
                })}
            </div>
        
        <h3>Time left: {timer}s</h3>
      </div>  
    </div>
  );
};

export default Question;
