import CarouselComponent from "@/Components/CarouselComponent";
import Navbar from "@/Layouts/NavLayout";
import { useEffect } from 'react';

export default function Welcome({ auth, categoriesParent }) {

    useEffect(() => {
        if (categoriesParent) {
            localStorage.setItem('categoriesParent', JSON.stringify(categoriesParent));
            console.log('categoriesParent', typeof (JSON.stringify(categoriesParent)));
        }
    }, [categoriesParent]);

    return (
        <>
            <div className="w-full bg-gray-100 fixed  ">
                <div className="relative z-50 ">
                    <Navbar auth={auth} showSearchBar showMenu showUpload />
                </div>
            </div>
            <main>
                <div >
                    <CarouselComponent img={["Banners1.jpeg", "Banners2.jpeg", "Banners3.jpeg"]} setting={{
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        speed: 1000,
                        autoplaySpeed: 5000,
                        cssEase: "linear"
                    }}
                        className="mx-20 pt-[100px] -z-50 "
                        classNameImg="w-1/3 h-[350px] object-fill -z-50 " />
                </div>
                <div>Tài liệu nổi bật trong tuần</div>
            </main>
        </>
    );
}
