import React from "react";
import YoutubeIcon from "../_icon/youtube";
import InstagramIcon from "../_icon/instagram";
import SpotifyIcon from "../_icon/spotify";
import MailIcon from "../_icon/mail";
import Link from "next/link";
import TikTokIcon from "../_icon/tiktok";

const FooterComponent = () => {
  return (
    <div className="py-14">
      <div className="h-[0.8pt] bg-gray-100  w-full mb-6 mt-24"></div>
      <div className="flex items-center justify-between max-w-64 mx-auto">
        <Link href={"https://www.youtube.com/@nshdev"} target="_blank">
          <YoutubeIcon color="#b4c5d1" className="w-8 h-8" />
        </Link>
        <Link href={"https://www.instagram.com/amisbudi_/"} target="_blank">
          <InstagramIcon color="#b4c5d1" className="w-6 h-6" />
        </Link>
        <SpotifyIcon color="#b4c5d1" className="w-6 h-6" />
        <Link href={"mailto:ibnnudev@gmail.com"} target="_blank">
          <MailIcon color="#b4c5d1" className="w-6 h-6" />
        </Link>
        <Link
          href={"https://www.tiktok.com/@ibnnu_as?lang=id-ID"}
          target="_blank"
        >
          <TikTokIcon fill="#b4c5d1" className="w-6 h-6" />
        </Link>
      </div>
      <div className="text-center text-base text-gray-600 mt-6">
        &copy; {new Date().getFullYear()} Moh Ibnu. All rights reserved.
      </div>
    </div>
  );
};

export default FooterComponent;
