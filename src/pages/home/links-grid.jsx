import React from 'react'

import insurance from 'shared/assets/images/insurance.jpeg'
import ozelim from 'shared/assets/images/ozelim.jpg'

export const LinksGrid = () => {
  return (
    <div className="overflow-hidden">
      <main className="container">
        {/* <div class="flex flex-wrap justify-between gap-3 p-4">
          <div class="flex min-w-72 mx-auto flex-col gap-4">
            <h1 class="text-white text-3xl md:text-4xl font-bold md:font-black leading-tight tracking-tighter z-10 text-center">
              Открой Казахстан вместе с OzElim!
            </h1>
          </div>
        </div> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 max-w-6xl mx-auto">
          <a
            className="group relative overflow-hidden rounded-full aspect-square block shadow-md"
            href="#"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Abstract gradient from purple to blue"
              style={{
                backgroundImage:
                  'url("https://akyldy.kz/wp-content/uploads/2025/04/bayanawyl-ulttyq-sayabaghy-twraly-qyzyqty-maelimetter-1024x683.jpg")',
              }}
            ></div>
            <div className="absolute inset-0 group-hover:bg-black/20 transition-all duration-300 rounded-full grid grid-rows-[70%_auto]">
              <div />
              <div className="bg-black/50 relative">
                <div className="absolute inset-0 flex items-center justify-center p-4 md:mb-4">
                  <p className="text-white md:text-5xl font-bold text-center leading-tight">Туры</p>
                </div>
              </div>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Geometric shapes in pastel colors"
              style={{
                backgroundImage:
                  'url("https://piligrimos.com/wp-content/uploads/2023/06/zaglavnaya-1.jpg")',
                backgroundPosition: 'right',
              }}
            ></div>
            <div className="absolute inset-0 group-hover:bg-black/20 transition-all duration-300 rounded-full grid grid-rows-[70%_auto]">
              <div />
              <div className="bg-black/50 relative">
                <div className="absolute inset-0 flex items-center justify-center p-4 md:mb-4">
                  <p className="text-white md:text-5xl font-bold text-center leading-tight">Визы</p>
                </div>
              </div>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-start transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Vibrant orange and yellow flowing lines"
              style={{
                backgroundImage: `url(${insurance})`,
              }}
            ></div>
            <div className="absolute inset-0 group-hover:bg-black/20 transition-all duration-300 rounded-full grid grid-rows-[70%_auto]">
              <div />
              <div className="bg-black/50 relative">
                <div className="absolute inset-0 flex items-center justify-center p-4 md:mb-4">
                  <p className="text-white md:text-3xl font-bold text-center leading-tight">
                    Страхование
                  </p>
                </div>
              </div>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Blue and pink paint swirls"
              style={{
                backgroundImage: 'url("https://inbusiness.kz/uploads/2022-2/uqTdKDhe.webp")',
                backgroundSize: '',
              }}
            ></div>
            <div className="absolute inset-0 group-hover:bg-black/20 transition-all duration-300 rounded-full grid grid-rows-[70%_auto]">
              <div />
              <div className="bg-black/50 relative">
                <div className="absolute inset-0 flex items-center justify-center p-4 md:mb-4">
                  <p className="text-white md:text-5xl font-bold text-center leading-tight">Фонд</p>
                </div>
              </div>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Holographic metallic texture"
              style={{
                backgroundImage: `url(${ozelim})`,
              }}
            ></div>
            <div className="absolute inset-0 group-hover:bg-black/20 transition-all duration-300 rounded-full grid grid-rows-[70%_auto]">
              <div />
              <div className="bg-black/50 relative">
                <div className="absolute inset-0 flex items-center justify-center p-4 md:mb-4">
                  <p className="text-white md:text-xl font-bold text-center leading-tight">
                    Ассоциация туристов Казахстана
                  </p>
                </div>
              </div>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Minimalist architectural lines"
              style={{
                backgroundImage: 'url("https://kosoblduma.ru/image/8158/31873/1/image.jpg")',
              }}
            ></div>
            <div className="absolute inset-0 group-hover:bg-black/20 transition-all duration-300 rounded-full grid grid-rows-[70%_auto]">
              <div />
              <div className="bg-black/50 relative">
                <div className="absolute inset-0 flex items-center justify-center p-4 md:mb-4">
                  <p className="text-white md:text-2xl font-bold text-center leading-tight">
                    Правовая защита
                  </p>
                </div>
              </div>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Soft focus pastel clouds"
              style={{
                backgroundImage:
                  'url("https://img.freepik.com/premium-photo/relax-young-asian-woman-bathrobe-towel-head-lying-sofa-bed-with-sliced-cucumbers-her-eyes-beauty-treatment-items-spa-procedures-such-as-essential-oil-salt-massage_43263-4585.jpg")',
              }}
            ></div>
            <div className="absolute inset-0 group-hover:bg-black/20 transition-all duration-300 rounded-full grid grid-rows-[70%_auto]">
              <div />
              <div className="bg-black/50 relative">
                <div className="absolute inset-0 flex items-center justify-center p-4 md:mb-4">
                  <p className="text-white md:text-4xl font-bold text-center leading-tight">
                    Санаторий
                  </p>
                </div>
              </div>
            </div>
          </a>
          <a className="group relative overflow-hidden rounded-full aspect-square block" href="#">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              data-alt="Colorful data visualization lines"
              style={{
                backgroundImage:
                  'url("https://www.kindpng.com/picc/m/593-5936397_airline-ticket-clipart-png-download-travel-tickets-clip.png")',
              }}
            ></div>
            <div className="absolute inset-0 group-hover:bg-black/20 transition-all duration-300 rounded-full grid grid-rows-[70%_auto]">
              <div />
              <div className="bg-black/50 relative">
                <div className="absolute inset-0 flex items-center justify-center p-4 md:mb-4">
                  <p className="text-white md:text-xl font-bold text-center leading-tight">
                    АВИА, ЖД билеты
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </main>
    </div>
  )
}
