import React, { useState, useRef, useEffect } from "react";
import CustomAlert from "./CustomAlert"; // Import the custom alert component

import "./Baucua.css";
import bat from "../images/bat.png";
import dia from "../images/dia.png";
import bau from "../images/bau.jpg";
import cua from "../images/cua.jpg";
import tom from "../images/tom.jpg";
import ca from "../images/ca.jpg";
import nai from "../images/nai.jpg";
import ga from "../images/ga.jpg";
import vndIcon from "../images/vndIcon.png";
import questionMark from "../images/questionMark.png";
import plusIcon from "../images/plusIcon.png";
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
  const [coins, setCoins] = useState(5000000);
  const [isSpinning, setIsSpinning] = useState(false); // Track spinning status
  const [hasBet, setHasBet] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [naptien, setNaptien] = useState(0);
  const [openNaptien, setOpenNaptien] = useState(false);
  const listItems = [
    {
      id: 1,
      name: "Bầu",
      image: bau,
      bet: 0,
    },
    {
      id: 2,
      name: "Cua",
      image: cua,
      bet: 0,
    },
    {
      id: 3,
      name: "Tôm",
      image: tom,
      bet: 0,
    },
    {
      id: 4,
      name: "Cá",
      image: ca,
      bet: 0,
    },
    {
      id: 5,
      name: "Gà",
      image: ga,
      bet: 0,
    },
    {
      id: 6,
      name: "Nai",
      image: nai,
      bet: 0,
    },
  ];

  // State lưu số tiền cược cho mỗi mục
  const [bets, setBets] = useState(
    listItems.reduce((acc, item) => {
      acc[item.id] = 0; // Khởi tạo cược bằng 0 cho mỗi item
      return acc;
    }, {})
  );
  const handleBetChange = (id, value) => {
    // Helper function to remove commas for raw value
    const unformatNumber = (val) => val.replace(/,/g, "");

    // Helper function to format numbers with commas

    // Remove formatting and check if the value is a valid number
    const rawValue = unformatNumber(value);
    if (/^\d*$/.test(rawValue)) {
      // Update the bets state with formatted input
      setBets((prevBets) => ({
        ...prevBets,
        [id]: rawValue, // Store unformatted number in the state
      }));
    }
  };

  const handlePlaceBet = () => {
    if (hasBet === true) {
      alert("Bạn đã đặt cược rồi");
      return;
    }
    // Tính tổng tiền cược
    const totalBet = Object.values(bets).reduce(
      (acc, bet) => acc + parseInt(bet || 0, 10),
      0
    );

    // Kiểm tra nếu tổng tiền cược lớn hơn 0 và không vượt quá số tiền có
    if (totalBet <= 0) {
      alert("Số tiền cược phải lớn hơn 0!");
      return;
    }
    if (totalBet > coins) {
      alert("Số tiền cược vượt quá số tiền bạn có!");
    } else {
      // Trừ tiền khi đặt cược
      setCoins((prevAmount) => prevAmount - totalBet);
      setHasBet(true);
      alert(`Bạn đã cược tổng cộng: ${formatCurrency(totalBet)} VND`);
    }
  };
  const checkReward = (finalImages) => {
    const selectedItems = finalImages; // Sử dụng kết quả quay đã lưu

    const imageCounts = selectedItems.reduce((counts, item) => {
      counts[item] = (counts[item] || 0) + 1;
      return counts;
    }, {});

    let totalReward = 0;

    Object.keys(bets).forEach((id) => {
      const betAmount = bets[id];
      const selectedImage = listItems[id - 1].image;

      if (betAmount > 0 && imageCounts[selectedImage]) {
        const rewardMultiplier = imageCounts[selectedImage];
        totalReward += parseInt(betAmount, 10) * (rewardMultiplier + 1);
      }
    });

    if (totalReward > 0) {
      setCoins((prevCoins) => prevCoins + totalReward);
      setAlertMessage(
        `Bạn đã thắng và nhận được ${formatCurrency(totalReward)} VND`
      );
      setShowAlert(true);
    } else {
      setAlertMessage("Bạn đã không trúng thưởng");
      setShowAlert(true);
    }

    setHasBet(false);
    resetBets();
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const resetBets = () => {
    setBets(
      listItems.reduce((acc, item) => {
        acc[item.id] = 0; // Reset each bet
        return acc;
      }, {})
    );
  };

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
  const showNaptien = () => {
    // Lấy số tiền cược cho mỗi mục
    setOpenNaptien(true);
  };
  const handleNaptien = () => {
    setCoins(coins + parseInt(naptien, 10));
    setNaptien(0);
    setOpenNaptien(false);
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
  function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  const getRandomImage = () => {
    if (isSpinning) return; // Prevent new spin if already spinning

    setIsSpinning(true); // Set spinning to true when the spin starts

    const spins = 30;
    let spinCount = 0;

    const interval = setInterval(() => {
      spinCount++;
      const randomIndex = Math.floor(Math.random() * ImageArray.length);
      const randomIndex1 = Math.floor(Math.random() * ImageArray.length);
      const randomIndex2 = Math.floor(Math.random() * ImageArray.length);

      setImage1(`${ImageArray[randomIndex]}`);
      setImage2(`${ImageArray[randomIndex1]}`);
      setImage3(`${ImageArray[randomIndex2]}`);

      // If the spin count reaches the desired number, stop spinning
      if (spinCount >= spins) {
        clearInterval(interval);
        setIsSpinning(false); // Set spinning to false after the spin finishes

        // Save final results and check for reward
        const finalImages = [
          ImageArray[randomIndex],
          ImageArray[randomIndex1],
          ImageArray[randomIndex2],
        ];

        checkReward(finalImages); // Send final results to checkReward
      }
    }, 100); // Update every 100ms
  };

  const handleSpinButton = () => {
    if (hasBet === false) {
      alert("Bạn phải đặt cược số tiền lớn hơn 0!");
      return;
    }
    // Kiểm tra nếu tổng số tiền cược lớn hơn 0 mới được phép xốc

    getRandomImage();
    audioRef.current.play();
  };

  const handleOpenButton = () => {
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
  // Format number with commas
  const formatNumber = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Remove formatting (commas) before setting state
  const unformatNumber = (value) => {
    return value.replace(/,/g, "");
  };

  const handleChange = (e) => {
    const rawValue = e.target.value;
    const unformatted = unformatNumber(rawValue); // Remove commas
    if (/^\d*$/.test(unformatted)) {
      setNaptien(unformatted); // Store unformatted number
    }
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
      <div className="w-4/5 grid grid-cols-2 md:grid-cols-3  gap-4 mb-8">
        {listItems.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-gray-200 rounded-lg flex flex-col items-center"
          >
            <img src={item.image} alt={item.name} className="w-16 h-16 mb-2" />
            {/* <p className="text-sm font-medium">{item.name}</p> */}
            <div className="flex items-center md:flex-row flex-col">
              <p className="text-sm font-medium">Tiền cược: </p>
              <input
                type="text"
                placeholder="0"
                value={formatNumber(bets[item.id])}
                onChange={(e) => handleBetChange(item.id, e.target.value)}
                className="md:w-3/5 w-full ml-2 p-1 border border-gray-300 rounded text-black"
                min="0"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="container mb-10">
        <button
          className="btn"
          style={{ backgroundColor: "lightblue" }}
          onClick={handleSpinButton} // Use the new function to handle the button click
          disabled={isSpinning} // Disable the button while spinning
        >
          Xốc
        </button>
        {/* <button
          className="btn"
          style={{ backgroundColor: "#52D3FF" }}
          onClick={handleResetImages}
        >
          Reset
        </button> */}
        <button
          className="btn"
          style={{ backgroundColor: "#9370db" }}
          onClick={handleOpenButton}
        >
          {text}
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "#FFD700" }}
          onClick={handlePlaceBet}
        >
          Đặt cược
        </button>
      </div>
      <div className="sound">
        <div
          className="w-2/3 flex flex-row items-center cursor-pointer"
          onClick={toggleMusic}
        >
          <img alt="" className="icon" src={icon} />
          <p className="textP" style={{ marginLeft: "15px", fontSize: "20px" }}>
            {textMusic}
          </p>
        </div>
        <select
          style={{ border: "none", borderRadius: "10px", color: "black" }}
          className="md:w-full w-7/8"
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
            // width: "180px",
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
        <div
          style={{
            // width: "180px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={showNaptien}
        >
          <img style={{ width: "30px", height: "30px" }} alt="" src={vndIcon} />
          <p className="textP" style={{ marginLeft: "15px" }}>
            Tiền: {formatCurrency(coins)}
          </p>
          <img
            style={{ width: "15px", height: "15px", marginLeft: "10px" }}
            alt=""
            src={plusIcon}
          />
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
            src="https://mybk.website/documents/MAZLUpBtQ9xIJpSRGrnU"
            // frameBorder="0"
          />
        </Modal>
        <Modal
          open={openNaptien}
          centered
          onOk={handleNaptien}
          onCancel={() => setOpenNaptien(false)}
        >
          <p>Nhập số tiền bạn muốn nạp</p>
          <input
            type="text" // Use text to enable custom formatting
            value={formatNumber(naptien)}
            onChange={handleChange}
            style={{ border: "1px solid black" }}
            className="w-full rounded-md p-2"
          />
        </Modal>
        {showAlert && (
          <CustomAlert message={alertMessage} onClose={closeAlert} />
        )}
      </div>
    </div>
  );
}

export default Baucua;
