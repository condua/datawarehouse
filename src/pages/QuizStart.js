import React, { useState,useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, setDoc, doc,getDoc  } from 'firebase/firestore'; // Required Firestore methods
import Leaderboard from './Leaderboard';
import Quiz from './Quiz';
import QuizKahoot from './QuizKahoot';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import '../scss/pages/QuizStart.scss'

function QuizStart() {
  const [name, setName] = useState('');
  const [namePlay,setNamePlay] = useState(null)
  const [mssv,setMssv] = useState(null)
  const [id, setId] = useState(null)
  const [leaderboardData, setLeaderboardData] = useState([]);
  console.log(leaderboardData[0])
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
    db.collection("names").get().then((querySnapshot) => {
      const data = querySnapshot.docs.map(doc => doc.data());
      setLeaderboardData(data);
    });
  }, []);
  const handleSubmit = async () => {
    if (!name) {
        alert('Nhập nickname của bạn');
        return;
    }
    if (!mssv) {
        alert('Nhập số nhóm của bạn');
        return;
    }

    // Lấy giá trị ID hiện tại từ Firestore
    const idRef = doc(firestore, 'metaData', 'currentId');
    let idSnap = await getDoc(idRef);
    // khởi tạo số thứ tự mỗi khi có một người dùng bắt đầu
    let nextId;
    if (idSnap.exists()) {
        nextId = idSnap.data().value + 1;
    } else {
        nextId = 1; // Đặt giá trị mặc định nếu chưa có giá trị ID trong Firestore
    }
    setId(nextId.toString()) //Đổi số thứ tự từ kiểu int sang kiểu string
    if (name.trim() !== '') {
        // Sử dụng nextId làm key cho bản ghi mới
        const newEntryRef = doc(firestore, 'names', nextId.toString());
        
        await setDoc(newEntryRef, { id: nextId, name, score: 0, mssv }, { merge: true });

        // Cập nhật giá trị ID trong Firestore
        await setDoc(idRef, { value: nextId });
        setName('');
        setNamePlay(name);
    }
};
  return (
    <div>
        {!namePlay ? (
        <div className='QuizStart'>
          <input type="text" placeholder="Enter your nick name" onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Enter your Student ID" onChange={(e) => setMssv(e.target.value)} />

          <button onClick={handleSubmit}>Start Quiz</button>
        </div>
      ) : (
        <QuizKahoot playerName={name} playerMssv={id} />
      )}
    </div>
  );
}

export default QuizStart;
