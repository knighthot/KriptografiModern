import React, { useState } from 'react';
import './Style.css';

const CryptoSystem = () => {
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [groupSize, setGroupSize] = useState(3);

  const handlePlaintextChange = (e) => {
    setPlaintext(e.target.value);
  };

  const handlechipertextChange = (e) => {
    setCiphertext(e.target.value);
  };

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const encrypt = () => {
    // Konversi plaintext dan key ke bentuk biner
    const plaintextBinary = plaintext;
    const keyBinary = key;

    // Lakukan operasi XOR bit per bit antara plaintext dan key
    let result = '';
    for (let i = 0; i < plaintextBinary.length; i++) {
      // Lakukan XOR bit per bit antara karakter plaintext dan key
      result += (parseInt(plaintextBinary[i], 10) ^ parseInt(keyBinary[i % keyBinary.length], 10)).toString();
    }

    // Tampilkan hasil ke ciphertext
    setCiphertext(result);
  };

  const decrypt = () => {
    // Konversi chiperteks dan kunci ke bentuk biner
    const ciphertextBinary = ciphertext;
    const keyBinary = key;
  
    // Lakukan operasi XOR bit per bit antara chiperteks dan kunci
    let result = '';
    for (let i = 0; i < ciphertextBinary.length; i++) {
      // Lakukan XOR bit per bit antara karakter chiperteks dan kunci
      result += (parseInt(ciphertextBinary[i], 10) ^ parseInt(keyBinary[i % keyBinary.length], 10)).toString();
    }
  
    // Tampilkan hasil ke plaintext
    setPlaintext(result);
  };
  

  const binaryToGroups = (binary) => {
    const groups = [];
    for (let i = 0; i < binary.length; i += groupSize) {
      groups.push(binary.slice(i, i + groupSize));
    }
    return groups;
  };

  const binaryToDecimal = (binary) => {
    return parseInt(binary, 2);
  };

  const binaryToHex = (binary) => {
    return parseInt(binary, 2).toString(16);
  };

  const renderResult = () => {
    const groupedCiphertext = binaryToGroups(ciphertext, groupSize);
  
    // Menyiapkan variabel untuk menyimpan hasil yang akan ditampilkan
    let renderedCiphertext = '';

    // Melakukan iterasi melalui setiap grup dan menambahkannya ke variabel hasil
    groupedCiphertext.forEach((group, index) => {
      // Memeriksa apakah ini grup terakhir atau tidak
      if (index === groupedCiphertext.length - 1) {
        // Jika ini grup terakhir, tambahkan grup tanpa spasi di akhir
        renderedCiphertext += group;
      } else {
        // Jika bukan grup terakhir, tambahkan grup dengan spasi di akhir
        renderedCiphertext += group + ' ';
      }
    });

    const binaryGroups = binaryToGroups(ciphertext);
    const decResults = binaryGroups.map((group) => binaryToDecimal(group));
    const hexResults = binaryGroups.map((group) => binaryToHex(group));
    const decTotal = decResults.reduce((acc, cur) => acc + cur, 0);
    const hexTotal = hexResults.reduce((acc, cur) => acc + parseInt(cur, 16), 0);

    const decimalValue = `${decResults.join(', ')} = ${decTotal}`;
    const hexadecimalValue = `${hexResults.join(', ')} = ${hexTotal.toString(16)}`;

    return (
      <div className="result-container">
        <label>Chiper Per Bits:</label>
        <input type="text" value={renderedCiphertext} readOnly />
        <label>Decimal:</label>
        <input type="text" value={decimalValue} readOnly />
        <label>Hexadecimal:</label>
        <input type="text" value={hexadecimalValue} readOnly />
      </div>
    );
  };

  return (
    <div className="container">
      <div className="content-container">
        <div className="left-column">
          <div className="card">
            <label>Plaintext (Binary):</label>
            <input type="text" value={plaintext} onChange={handlePlaintextChange} />
            <br />
            <label>Key (Binary):</label>
            <input type="text" value={key} onChange={handleKeyChange} />
            <br />
            <label>Group Size:</label>
            <select value={groupSize} onChange={(e) => setGroupSize(parseInt(e.target.value))}>
              <option value={3}>3 bits</option>
              <option value={4}>4 bits</option>
            </select>
          </div>
        </div>
        <div className="right-column">
          <div className="card">
            {renderResult()}
          </div>
        </div>
      </div>
      <div className="button-container">
        <button onClick={encrypt}>Encrypt</button>
      </div>
      <div className="content-container">
        <div className="left-column">
          <div className="card">
            <label>Ciphertext (Binary):</label>
            <input type="text" value={ciphertext} onChange={handlechipertextChange} />
            <label>Key (Binary):</label>
            <input type="text" value={key} onChange={handleKeyChange} />
            <br />
          </div>
        </div>
        <div className="right-column">
          <div className="card">
            <label>Plaintext (Binary):</label>
            <input type="text" value={plaintext} readOnly />
          </div>
        </div>
      </div>
      <div className="button-container">
        
        <button onClick={decrypt}>Decrypt</button>
      </div>
    </div>
  );
};

export default CryptoSystem;
