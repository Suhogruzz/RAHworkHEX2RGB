import { ChangeEvent, useState, useRef } from "react";

const HEX2RGBConverter = () => {
    const [hex, setHex] = useState('');
    const [rgb, setRgb] = useState('');
    const [error, setError] = useState('');
    const formElement = useRef<HTMLFormElement>(null);
    const divColorElement = useRef<HTMLDivElement>(null);

    const ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const UserHex = event.target.value;
        const form = formElement.current as HTMLFormElement;
        const divColor = divColorElement.current as HTMLDivElement;
        if (UserHex.length === 7 && /^#[0-9A-Fa-f]{6}/i.test(UserHex)) {
            setHex(UserHex);
            setRgb(HexToRgb(UserHex));
            form.style.backgroundColor = HexToRgb(UserHex);
            divColor.style.backgroundColor = HexToRgb(UserHex);
        }
        if (UserHex.length === 7 && !/^#[0-9A-Fa-f]{6}/i.test(UserHex)) {
            setHex("HEX");
            setRgb('');
            setError('ОШИБКА!');
            form.style.backgroundColor = 'red';
            divColor.style.backgroundColor = 'red';
        }
        if (UserHex === '') {
            form.style.backgroundColor = 'white';
            divColor.style.background = 'white';
        }
    }

    const HexToRgb = (hex: string) => {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    return (
        <form ref={formElement}>
        <input
          type="text"
          className="hex-color"
          onChange={ChangeHandler}
          defaultValue={hex}
          maxLength={7}
          placeholder="Введите цвет в формате HEX"
        ></input>
        <div
          className={rgb !== "" ? "rgb-color rgb" : "rgb-color error"}
          ref={divColorElement}
        ></div>
        <span className="text-color">{rgb !== "" ? rgb : error}</span>
      </form>
    );
};

export default HEX2RGBConverter
