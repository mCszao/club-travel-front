import { Swiper } from 'swiper/react';
import { ISlider } from '../../Interface/ISlider';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './slider.styles.css';

export const Slider = ({ settings, children, className }: ISlider) => {
    return (
        <Swiper modules={[Navigation, Pagination, A11y]} className={className} {...settings}>
            {children}
        </Swiper>
    );
};
