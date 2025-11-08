import React from 'react'
import heroimg from 'shared/assets/images/hero-image.jpg'

export const LinksGrid = () => {
  return (
    <div className="-mt-8 relative overflow-hidden">
      <div
        className="absolute h-full w-full inset-0"
        style={{
          backgroundImage: `url(${heroimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px) brightness(0.55)',
        }}
      />
      <main className="container">
        <div class="flex flex-wrap justify-between gap-3 p-4">
          <div class="flex min-w-72 mx-auto flex-col gap-4">
            <h1 class="text-white text-5xl font-black leading-tight tracking-tighter z-10">
              Экосистема OzElim
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          <a
            className="group relative overflow-hidden rounded-full aspect-square block shadow-md"
            href="#"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Abstract gradient from purple to blue"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC3qk51Y-yEWFziuEBF1zg3jE7LYIk0zvdJyUAQ0hExr55Vx5v8TpP_HMHXOt-xDPb3rWPqRYD6qh2WQ3PbHPlWy1Ma6dBVW3sz-L6FObQaJbplVISaITMlSVlTYtXiQFG2PNHEnZpR2aoFf8F77mEkeVwWkFw1P5DQ3UWfh1ImzIQFxAyAdhHPPSl3WCnjhT3mzWmdPCQ10wqYgI7Ll1ZdTBd0XknDQNh1okb9tC-yd7JOEcCnhLr0rpV0FE4bg501NDD6jYV5vNtM")',
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-white text-lg font-bold text-center leading-tight">
                Правовая защита
              </p>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Geometric shapes in pastel colors"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBONgyscjwDvMQPMNdn01Qn6rwdnSWjJYLp_sR6UbpJZAqiXjH9L4_UPA_O_NJFJxWXxk_5fML_n5ul2cZwrN35oh9nVDDpVIB1ffhbc8IdkRBTzpwJz_XKrjWhihfkyt5hvwAdfoW2PlEqsOlROZ4-pm9VQ3bycgDVakp8K9qFcnzYxi4J0ODJ2hFOUaI37noUt8GTC_Q7zWcJ1g-ip2XRLLwtRG_uav4FF2X3TPJ5wmxlRTJeVRXiQQ0p4oasQgxM7Hz953j1hpZQ")',
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-white text-lg font-bold text-center leading-tight">
                АВИА, ЖД Билеты
              </p>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Vibrant orange and yellow flowing lines"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBVy-vmR2JL9yUz2cjC2F5-FVl6wbm-0S2jjOChVqrfzm7PBoAi1Zs8yLixC0A3tvcg5eCfK5RgP4bbZdqWOQkJXGFEO8yIHih7xdlzTfu6J9SEQRBeLjJP1oUomc6SSZAHPhqC_ITLElXT2BlAZa3m0iBcV-FEQ2yVPkuH1TqeR9bGcf17WD6RlehIZ_quZh62YOjlwABDU92hA3rAZNt-3_W1iiAXaiUP4BIhxEZJoFsqya44xG0aUdCh0tDz5xJTi4kU1OeSG4G5")',
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-white text-lg font-bold text-center leading-tight">Страхование</p>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Blue and pink paint swirls"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAP_6BUv_uXb-cWwgWhDF_5zpnHikXhDDAIz345SmcU7WIxoHjkl2uax7MUWW-5A9tHxrfvcO448du0daWxbgzdTp887yh7Vw_U5Mm-z7m7QhzlQQDWVkbKtNq6xi7OXKopU1PJ7PEBzRorD3HfRXSKygLKFfodOWDZ7BiLXi54H5n2s-t8dxWquILTAHw83wpoRSOEcnbIXae_cNvDu8xnKgD5wTrNWFANeWl8YXKSbBQqBHqTqjsfAfvlMX3su_zSad2NxQdcetT-")',
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-white text-lg font-bold text-center leading-tight">Виза</p>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Holographic metallic texture"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnzfqrWz9_Id-3v0vFIlNzrKaH1VU3dMDjDZqiq3e7yRYDLzYvIkqWxXmsu7rcIVCdm4UYPkBdTg0Wj7fVU7C7Nfh5B7AoG2yM60Vs1YXvzUmaw8R2EFgPcjlvB9ALRce3_Du5wOhLfGFDOS3vc9CAJJBVmg21gqMqHzlZsE2FxH6a_-0gUNYrUFUmiXbYw9MdciXFtZLkSK084bp0qfq-8FGRyb8H98mPDztDVzVtpCPV-XE_HBIJwsPBrzai_m8kQWTTRr4oJY0e")',
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-white text-lg font-bold text-center leading-tight">Туры</p>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Minimalist architectural lines"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8SBJb-fjCLpU57t22WBUOIqIQBlJ8HwhelOPWz5Yr3Zyk1NQ-LzZ5a_EYPKP0RMxuODkSDpT0HnoCT9KZo5ujIQc_dyAuZn5kKbW7yzE1r-JXvR3Q5ibmjRkL08xchpss1mS3EnvjjP3MDC8Ji4v6yI2E0CYJL2qRhXbhDHb1Qcv988DpiN44SzucEdKhlai32YCDEzTdVxu8UQUEJD4rnGZ4lwq9PfDg48ZKm8_U34lT_BzC9BSK8ZGMF1FhhpduFdY44abx2TnJ")',
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-white text-lg font-bold text-center leading-tight">Санатории</p>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Soft focus pastel clouds"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQMTh_MV8f-yvy5mKDcwP72I_VX8O6auGzVAXgDTg7kOsUjHDRGBa2GI08azXwEMyBg7HVe2dBPavaN7DpDCHdA-SJscuwbXLBG1vhVyr-P1qHnjN481SGqLEb2925Hegje6vFcjeclBxoQq6_RctYbtrL7K16BUTlOTaoCcYpnMVRGi8IWRhdzDpbMczGBmaR9XYlv7hqosPh4dbC-fUQpiuiIZiRffvIfOR7qr2k_ifMoBN9uDeBRC2e5Z23QAm17SJ6QyQM20_s")',
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-white text-lg font-bold text-center leading-tight">Фонд</p>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Colorful data visualization lines"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA4OEY-Vs1ulXUCbw-thjghv_RChP5wJOXzpJOG9HmTb34m6tVQFGEOR9y0S4LcfsJuzMkSqBBiMUaaqaTtiLWnYh1k4YpQUFWtISjnTtYF-QYUDb03QEFoyAN-BEJUJSmx6hze94SeYYDDI8iIWjl1u2-YyaSFGi1ouAW3kfOanDr1z17BNngacZT75hwFPkzgQ76we9W8or54sQzMGjq7QYPB79s6zqGgF_08cW_AzfPpPIqLudf422MhbJGwckaS5vCkJSQG9dYw")',
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-white text-lg font-bold text-center leading-tight">
                Ассоциация Туристов Казахстана
              </p>
            </div>
          </a>
        </div>
      </main>
    </div>
  )
}
