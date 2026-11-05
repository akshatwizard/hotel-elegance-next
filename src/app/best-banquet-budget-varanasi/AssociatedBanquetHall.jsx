import Link from 'next/link';
const AssociatedBanquetHall = () => {
    return (
        <section className="py-16 bg-[#eae7e1] pt-10 pb-5 other-hotel-section">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="col-12">
                    <div className="rx-banner-1 text-center rx-banner-effects mb-2">
                        <h5 className="other-hotel-head">
                            Associated Banquet Hall
                        </h5>                       
                    </div>
                </div>
                <div className="flex flex-col gap-5 py-6 max-w-5xl mx-auto">
                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_480px] shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-3 flex flex-col gap-2.5 bg-[#9a5e2a] text-white lg:order-1 order-2">                            
                            <h2 className="text-2xl font-semibold text-white">Shubhkamna Banquet</h2>
                            <p className="other-hotel-subhead text-white leading-relaxed italic">
                                For all Events
                            </p>
                            <hr className="border-white/20 my-1" />
                            <p className="text-sm text-white leading-relaxed flex-1">
                               The Elegance Hotel offers you Shubhkamna Banquet, the Best Banquet in Varanasi with two halls, Mandapam and Mannat, hosting up to 500 guests. If you have an Engagement, Birthday Party, Reception, Family Get Together, Wedding Anniversary, Ring Ceremony, Sangeet & Mehandi Function.
                            </p>
                            <a
                                href="https://www.varanasibanquet.com/"
                                target="_blank"
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-white border border-white/40 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors w-fit mt-1"
                            >
                                Explore Banquet <i className="icon-5" />
                            </a>
                        </div>
                        <div className="relative h-64 md:h-auto order-1 lg:order-2">
                            <img
                                src="/assets/dev-img/Shubhkamana-Banquet-Hall.png"
                                alt="Shubhkamna Banquet"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default AssociatedBanquetHall;