import CarouselComponent from "@/Components/CarouselComponent";
import FeaturedDocumentLayout from '@/Layouts/FeaturedDocumentLayout';
import FooterLayout from '@/Layouts/FooterLayout';
import Navbar from "@/Layouts/NavLayout";
import { useEffect } from 'react';
export default function Welcome({ auth, categoriesParent, featuredDocument }) {
    console.log('featuredDocument', featuredDocument)
    useEffect(() => {
        if (categoriesParent) {
            localStorage.setItem('categoriesParent', JSON.stringify(categoriesParent));
        }
    }, [categoriesParent]);

    return (
        <>
            <Navbar auth={auth} showSearchBar showMenu showUpload />
            <main>
                <div className="mx-20 z-0 pt-[100px]">
                    <CarouselComponent img={["Banners1.jpeg", "Banners2.jpeg", "Banners3.jpeg"]} setting={{
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        speed: 1000,
                        autoplaySpeed: 5000,
                        cssEase: "linear"
                    }}
                        className="mx-20 pt-[100px]  "
                        classNameImg="w-1/3 h-[350px] object-fill " />
                </div>

                <FeaturedDocumentLayout items={featuredDocument} />
            </main>
            <FooterLayout />
        </>
    );
}
