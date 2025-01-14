import { useState } from "react";
import ButtonColor from "./ButtonColor";
import ColorBox from "./ColorBox";

interface ColorPickerProps{
	icon?:React.ReactNode;

}


const ColorPicker = (props: ColorPickerProps) => {
    const {icon} = props
    const [openColorPicker, setopenColorPicker] = useState<boolean>(false);

    return ( 

        <div className="relative">
            <ButtonColor 
            icon={icon}
            openColorPicker={openColorPicker}
            setOpenColorPicker={setopenColorPicker}
            >
{/* {openColorPicker && <ColorBox> Color Box </ColorBox>} */}

            </ButtonColor>

        </div>
     );
}
 
export default ColorPicker;