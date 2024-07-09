import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import '../scss/pages/Leaderboard.scss'


const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Cấu hình Firebase (bạn sẽ cần thay thế các giá trị này bằng giá trị của bạn)
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

    // Lấy dữ liệu từ Firestore
    const db = firebase.firestore();
    const unsubscribe = db.collection("names").onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map(doc => doc.data());

      // Sắp xếp data theo score giảm dần
      const sortedData = data.sort((a, b) => b.score - a.score);
      
      setLeaderboardData(sortedData);
    });

    // Unsubscribe khi component unmount để tránh memory leak
    return () => unsubscribe();
  }, []);

  return (
    <div className='Leaderboard'>
      <h1>Bảng xếp hạng</h1>
      <table>
        <tr>
          <th>Xếp hạng</th>
          <th>Nickname</th>
          <th>Nhóm</th>
          <th>Điểm</th>
        </tr>
    
        {leaderboardData.map((entry, index) => {
          let className = '';
          if (index === 0) className = 'highlighted-first';
          else if (index === 1) className = 'highlighted-second';
          else if (index === 2) className = 'highlighted-third';

          return (
              <tr key={index} className={className}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.mssv}</td>
                  <td>{entry.score}</td>
              </tr>
          );
          })}
     

      </table>
      
    </div>
  );
};

export default Leaderboard;
