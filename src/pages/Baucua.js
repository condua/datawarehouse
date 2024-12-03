import React, { useState, useRef, useEffect } from "react";
import "./Baucua.css";
import bat from "../images/bat.png";
import dia from "../images/dia.png";
import bau from "../images/bau.jpg";
import cua from "../images/cua.jpg";
import tom from "../images/tom.jpg";
import ca from "../images/ca.jpg";
import nai from "../images/nai.jpg";
import ga from "../images/ga.jpg";

import questionMark from "../images/questionMark.png";

import sound from "../sound/baucua.mp3";

import nhacTet from "../sound/nhacTet.mp3";
import nuCuoiXuan from "../sound/nuCuoiXuan.mp3";
import tetNayConSeVe from "../sound/tetNayConSeVe.mp3";
import tetBinhAn from "../sound/tetBinhAn.mp3";
import xuanPhatTai from "../sound/xuanPhatTai.mp3";
import tuNhienCaiTet from "../sound/tuNhienCaiTet.mp3";
import xuanDenLa from "../sound/xuanDenLa.mp3";
import tetDiEmOi from "../sound/tetDiEmOi.mp3";
import teLaPhaiDiVeNha from "../sound/tetLaPhaiVeNha.mp3";
import donXuan from "../sound/donXuan.mp3";
import chuyenCuBoQua from "../sound/chuyenCuBoQua.mp3";
import motNamMoiBinhAn from "../sound/motNamMoiBinhAn.mp3";
import diDeTroVe from "../sound/diDeTroVe.mp3";
import diVeNha from "../sound/diVeNha.mp3";
import mangTienVeChoMe from "../sound/mangTienVeChoMe.mp3";
import yChangXuanSang from "../sound/yChangXuanSang.mp3";
import tetDongDay from "../sound/tetDongDay.mp3";
import playlist17songs from "../sound/playlist17songs.mp3";

import iconSound from "../images/sound.jpg";
import iconMute from "../images/mute.jpg";

import Modal from "antd/es/modal/Modal";

const ImageArray = [bau, cua, tom, ca, ga, nai];

const listMusic = [
  {
    music: nhacTet,
    name: "Ngày Xuân Long Phụng Sum Vầy - Bích Phương",
  },
  {
    music: nuCuoiXuan,
    name: "Nụ Cười Xuân - YuniBoo, H2k",
  },
  {
    music: tetNayConSeVe,
    name: "Tết này con sẽ về - Bùi Công Nam",
  },
  {
    music: tetBinhAn,
    name: "Tết Bình An - Hana Cẩm Tiên",
  },
  {
    music: xuanPhatTai,
    name: "Xuân Phát Tài - Song Thư",
  },
  {
    music: tuNhienCaiTet,
    name: "Tự nhiên cái Tết - Bùi Công Nam",
  },
  {
    music: xuanDenLa,
    name: "Xuân Đến Lạ - Thiên Tú",
  },
  {
    music: tetDiEmOi,
    name: "Tết Đi Em Ơi - Masew, Khoi Vu, Kaybo",
  },
  {
    music: teLaPhaiDiVeNha,
    name: "Tết Là Phải Đi Về Nhà - Nhật Kim Anh",
  },
  {
    music: donXuan,
    name: "Đón Xuân - Thanh Hà",
  },
  {
    music: chuyenCuBoQua,
    name: "Chuyện Cũ Bỏ Qua - Bích Phương",
  },
  {
    music: motNamMoiBinhAn,
    name: "Một Năm Mới Bình An - Sơn Tùng MTP",
  },
  {
    music: diDeTroVe,
    name: "Đi để trở về - Soobin Hoàng Sơn",
  },
  {
    music: diVeNha,
    name: "Đi về nhà - Đen, JustaTee",
  },
  {
    music: mangTienVeChoMe,
    name: "Mang Tiền Về Cho Mẹ - Đen",
  },
  {
    music: yChangXuanSang,
    name: "Y Chang Xuân Sang - Nal",
  },
  {
    music: tetDongDay,
    name: "Tết Đong Đầy - Kay Trần",
  },
  {
    music: playlist17songs,
    name: "Playlist Gồm 17 Bài Hát",
  },
];

function Baucua() {
  const [showBat, setShowBat] = useState(false);
  const [text, setText] = useState("Đậy");
  const [image1, setImage1] = useState(bau);
  const [image2, setImage2] = useState(bau);
  const [image3, setImage3] = useState(bau);
  const [spinning, setSpinning] = useState(false);
  const [music, setMusic] = useState(playlist17songs);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [textMusic, setTextMusic] = useState("Bật nhạc");
  const [icon, setIcon] = useState(iconSound);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const audioRef = useRef(new Audio(sound));
  const audioMusic = useRef(new Audio(music));

  const sortedListMusic = listMusic
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleMusicChange = (e) => {
    const selectedMusic = e.target.value;
    setMusic(selectedMusic);

    // Update background music immediately
    audioMusic.current.pause();
    audioMusic.current = new Audio(selectedMusic);
    if (audioEnabled) {
      audioMusic.current.play();
    }
  };
  useEffect(() => {
    if (audioEnabled) {
      audioMusic.current.play();
    } else {
      audioMusic.current.pause();
    }
  }, [audioEnabled, music]);

  useEffect(() => {
    if (spinning) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [spinning]);

  const toggleMusic = () => {
    setAudioEnabled(!audioEnabled);
    if (textMusic === "Bật nhạc") {
      setTextMusic("Tắt nhạc");
      setIcon(iconMute);
    } else {
      setTextMusic("Bật nhạc");
      setIcon(iconSound);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleResetImages = () => {
    setImage1(bau);
    setImage2(bau);
    setImage3(bau);
  };

  function getRandomImage() {
    if (spinning) return;

    setSpinning(true);
    const spins = 30;

    let spinCount = 0;
    const interval = setInterval(() => {
      spinCount++;
      const randomIndex = Math.floor(Math.random() * ImageArray.length);
      const randomIndex1 = Math.floor(Math.random() * ImageArray.length);
      const randomIndex2 = Math.floor(Math.random() * ImageArray.length);

      const selectedImage = ImageArray[randomIndex];
      const selectedImage1 = ImageArray[randomIndex1];
      const selectedImage2 = ImageArray[randomIndex2];

      setImage1(`${selectedImage}`);
      setImage2(`${selectedImage1}`);
      setImage3(`${selectedImage2}`);

      if (spinCount >= spins) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 100);
  }

  const handleDapButton = () => {
    if (text === "Đậy") {
      setText("Mở");
    } else {
      setText("Đậy");
    }
    setShowBat(!showBat);
  };
  const customBodyStyle = {
    height: "500px", // Đặt chiều cao của phần nội dung là 300px
    // padding: '20px', // Đặt lề là 20px
    // backgroundColor: '#f0f0f0', // Đặt màu nền
    // // Thêm các thuộc tính CSS khác tùy thuộc vào thiết kế của bạn
  };
  return (
    <div className={`Baucua${spinning ? " spinning" : ""}`}>
      <div className="dia-container">
        <img className="bat" alt="" src={dia} />
        {showBat && (
          <img
            className={`bat-cover${spinning ? " shaking" : ""}`}
            alt=""
            src={bat}
          />
        )}
        <div className="list-items">
          <img alt="" src={image1} className="item" />
          <img alt="" src={image2} className="item" />
          <img alt="" src={image3} className="item" />
        </div>
      </div>

      <div className="container">
        <button
          className="btn"
          style={{ backgroundColor: "lightblue" }}
          onClick={() => {
            getRandomImage();
            audioRef.current.play();
          }}
        >
          Xốc
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "#52D3FF" }}
          onClick={handleResetImages}
        >
          Reset
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "#9370db" }}
          onClick={handleDapButton}
        >
          {text}
        </button>
      </div>

      <div className="sound">
        <div
          style={{
            width: "150px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={toggleMusic}
        >
          <img alt="" className="icon" src={icon} />
          <p className="textP" style={{ marginLeft: "15px", fontSize: "20px" }}>
            {textMusic}
          </p>
        </div>
        <select
          style={{ border: "none", borderRadius: "10px", color: "black" }}
          onChange={handleMusicChange}
          value={music}
        >
          {/* Use map to generate options dynamically */}
          {sortedListMusic.map((musicOption, index) => (
            <option key={index} value={musicOption.music}>
              {musicOption.name}
            </option>
          ))}
        </select>
        <div
          style={{
            width: "180px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={showModal}
        >
          <img
            style={{ width: "30px", height: "30px" }}
            alt=""
            src={questionMark}
          />
          <p
            className="textP"
            onClick={showModal}
            style={{ marginLeft: "15px" }}
          >
            Hướng dẫn chơi
          </p>
        </div>
        <Modal
          width={1000}
          title="Hướng dẫn chơi"
          bodyStyle={customBodyStyle}
          centered
          open={isModalOpen}
          onCancel={handleOk}
          onOk={handleOk}
        >
          {/* Thay đổi đường dẫn trong src thành trang web bạn muốn hiển thị */}
          <iframe
            title="Web Content"
            width="100%"
            height="490"
            src="https://mybk.tech/documents/MAZLUpBtQ9xIJpSRGrnU"
            // frameBorder="0"
          />
        </Modal>
      </div>
    </div>
  );
}

export default Baucua;
