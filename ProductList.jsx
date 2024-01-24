// ProductList.js
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import axios from "axios";

const ProductList = () => {
    const basalamApiToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMSIsImp0aSI6ImU0MTJlNzE0OGFkOGNmMmU4YjgwYjUyNDZmMWVlNTEzMjBjZjM5YWE3NzZlMDlmZDYwZTUzYjM4M2E2NTQ3YmQ0OTU3YWY5OTNkZmI3NGFiIiwiaWF0IjoxNzA1MzIwNzQ0LjA3Mjk4MywibmJmIjoxNzA1MzIwNzQ0LjA3Mjk4OCwiZXhwIjoxNzM2OTQzMTQ0LjA1MDg0Mywic3ViIjoiMTMxNjYzMTEiLCJzY29wZXMiOltdLCJ1c2VyX2lkIjoxMzE2NjMxMX0.HrQlsuod1BsfsHy_ML5reebKHdCsZD8SPhNnAYuZm8MgeXhyrAOHuhN45TdDAiXTT4s5Jqye2A1bc4OBdiq3-zGDKMj5tULGvLRZY02lVl-D55Vs_1KCxkGTcwMW_Blf7sAIrNgZVkMEIheB9GwfdS7H5s4P7LOlKzBtZVDymxWbiJDwAB4o0pjYb5XMzFsnGeIkPrfJcLvdOsKO-eEJG_KMVmcfk2Fu-NETUI0LOjs7CLZYJd96VbAO4JPfunsqBUUGFcV4WYd3ymAveK4u71kdj1Y0d_o-CNRWCCn8J92ROOPtsI7Ro3SQcI5z47SEnHh2K4ghNLS87lhycFMfI12ZR1fvuRRnEXBhVTWNMOdKQlD7flvMRWUJJE8-Os9ALz4Q_n87qVDr1HWUdau2KYApwxZuWo9VPXNTiUW6Y4I-V49C-KE3I9rYxORr_BRj5YmbvxPISKQNxK-HLN3KZiJGl3N8uZXRjqXZQTbgn7FyVicn_DoW6XyhU3j37h76LDQaLpbF3ICHJKhrKo10g-4um2ouKIJGeo5kPD5EQOs0Fkm4__NZjuK90U1a1V09fK-kGmDx6p2qgCru3OBK4YcEzQLmzU7lzWM_oHpwNSaUOxgROaocMGOrl2M7TaU8ol0kMnD--s9Ogt9PU1O_BMD_ziOwsUTpXoHX4QKQtho"

    //fetch data and get items
    const {isPending, error, data: products} = useQuery({
        queryKey: ['myData'],
        queryFn: () =>
            fetch(
                'https://search.basalam.com/ai-engine/api/v2.0/product/search?from=0&filters.slug=handmade-leather-accessory&dynamicFacets=true&size=48&adsImpressionDisable=false',
                {
                    headers: {
                        'Origin': 'https://basalam.com',
                        'Authorization': `Bearer ${basalamApiToken}`,
                    }
                }
            ).then((res) => res.json(),)
    })

    //post item
    const addToBasket = async (product) => {
        try {
            const payload = {
                quantity: 1, // You can adjust the quantity as needed
                product_id: product.id,
                variation_id: null,
            };

            const response = await axios.post(
                'https://order.basalam.com/basket/item?light=true',
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${basalamApiToken}`,
                    },
                }
            );
            document.getElementById('my_modal_3').showModal()

        } catch (error) {
            console.error("Error adding item to basket:", error.message);
        }
    };
    if (isPending) return <span className="loading loading-dots loading-lg"></span>

    if (error) return 'An error has occurred: ' + error.message
    return (

        <div className="flex flex-col items-center gap-10 justify-center w-full ">
            <div className="flex items-center justify-center items-center gap-60 pt-10">
                <h2 className="text-lg font-bold">لیست محصولات</h2>
                <Link to="/basket" className="btn">سبد خرید →
                    <div className="badge badge-secondary">+99 کالا</div>
                </Link>
            </div>

            <div onClick={() => {
            }} className="grid grid-cols-4 gap-4">
                {products.products?.map((product) => (
                    <div key={product.id} className="card w-80 bg-base-100 shadow-xl image-full">
                        <figure><img src={product.photo.MEDIUM} alt="Shoes"/></figure>

                        <div className="card-body items-center justify-between py-16  text-center">
                            <h2 className="card-title">{product.name}</h2>
                            <div className="flex gap-3">
                                <p>تومان</p>
                                <p> {product.price} </p>
                            </div>

                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={() => {
                                    addToBasket(product);
                                }}> افزودن به سبد
                                </button>
                                <Link to={`/products/${product.id}`} onClick={() => {
                                }} className="btn ">مشاهده محصول</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">تبریک میگم!</h3>
                    <p className="py-4">خریدت به سبد اضافه شد:)</p>
                </div>
            </dialog>
        </div>
    );
};

export default ProductList;
