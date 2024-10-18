import React, { useEffect, useState } from "react";
import { congViecService } from "../../services/congViec.service";
import { Link } from "react-router-dom";
import "../../styles/font.scss";
import "./jobBar.scss";
import { pathDefault } from "../../common/path";

const JobBar = () => {
   const [menuJobType, setMenuJobType] = useState([]);
   const [hoveredItem, setHoveredItem] = useState(null);

   useEffect(() => {
      congViecService
         .layMenuLoaiCongViec()
         .then((res) => {
            setMenuJobType(res.data.content || []);
         })
         .catch((err) => {
            console.error(err);
         });
   }, []);

   const handleMouseEnter = (id) => {
      setHoveredItem(id);
   };

   const handleMouseLeave = () => {
      setHoveredItem(null);
   };

   return (
      <div className="job_bar border-t">
         <div className="container flex justify-between py-2 leading-6">
            {menuJobType.slice(0, 9).map((itemLoai) => (
               <div
                  className="categories"
                  key={itemLoai.id}
                  onMouseEnter={() => handleMouseEnter(itemLoai.id)}
                  onMouseLeave={handleMouseLeave}
               >
                  <Link
                     to={`${pathDefault.jobType}?loai-cong-viec=${itemLoai.id}`}
                     className="hover:cursor-pointer"
                  >
                     {itemLoai.tenLoaiCongViec}
                  </Link>
                  <div
                     className={`dropdown-content ${
                        hoveredItem === itemLoai.id ? "visible" : "hidden"
                     }`}
                  >
                     {itemLoai.dsNhomChiTietLoai.map((itemNhom) => (
                        <div className="bg-white py-5 px-10" key={itemNhom.id}>
                           <h4 className="font-bold">{itemNhom.tenNhom}</h4>
                           <div>
                              {itemNhom.dsChiTietLoai.map((itemChiTiet) => (
                                 <Link
                                    className="hover:cursor-pointer block"
                                    to={`/ma-chi-tiet-loai-${itemChiTiet.id}`}
                                    key={itemChiTiet.id}
                                 >
                                    {itemChiTiet.tenChiTiet}
                                 </Link>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default JobBar;
