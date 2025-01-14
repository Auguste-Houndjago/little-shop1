
import { motion } from 'framer-motion';
import clsx from 'clsx';


interface ButtonProps {
	icon:React.ReactNode;
	openColorPicker: boolean
	setOpenColorPicker: React.Dispatch<React.SetStateAction<boolean>>
}


const ButtonColor = (props: ButtonProps) => {
const {icon, openColorPicker, setOpenColorPicker} = props


	return ( 

	<motion.button
	 onClick={()=>setOpenColorPicker(!openColorPicker)}
	 whileTap={{scale:0.97}}
	 className={ clsx(`text-sm h-10 bg-slate-900 font-medium rounded-full border border-slate-600 p-2 relative transition-colors duration-75`, openColorPicker ? 'text-slate-300 ': 'text-slate-500' )}
	>


     {icon}


	</motion.button>
	
	 );
}
 
export default ButtonColor;