import { Carousel } from '@mantine/carousel'
import { Image } from '@mantine/core'
import React from 'react'

export default function BlockTwo() {
  return (
    <>
      <div className="relative flex h-auto w-full flex-col group/design-root overflow-x-hidden pt-8 bg-zinc-100">
        <div className="container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center">
            <div className=" flex flex-col flex-1 pb-8">
              <main className="border rounded-lg overflow-hidden bg-white shadow-lg">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                  <div className="flex min-w-72 flex-col gap-4 mx-auto">
                    <h1 className="text-primary text-3xl md:text-4xl font-black leading-tight tracking-tighter">
                      Наши партнеры
                    </h1>
                  </div>
                </div>
                <div className="space-y-6 mt-4">
                  <p className="text-gray-800 text-base font-normal leading-loose pb-3 pt-1 px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nihil
                    veritatis nemo consectetur consequatur! Ducimus perferendis culpa sed, dolorum
                    impedit minima. Repellendus, vero perferendis quis autem perspiciatis fugit
                    pariatur optio vitae dignissimos odit! Quo beatae vel animi vitae. Nisi ut iste
                    ad explicabo voluptatibus quaerat eum. Deserunt quis praesentium totam excepturi
                    quas iste velit odio animi sunt accusantium distinctio molestiae ad esse nisi ab
                    hic inventore magni similique quo, eos quisquam porro voluptatum! Saepe unde hic
                    consectetur architecto tenetur suscipit blanditiis libero natus cum! Minus iure,
                    facilis tempora pariatur dolorem dolorum animi aliquid porro natus? Ducimus
                    eligendi eos officia suscipit.
                  </p>
                  <p className="text-gray-800 text-base font-normal leading-loose pb-3 pt-1 px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eum nemo soluta
                    ipsum veritatis sint rerum quis vel earum molestias laudantium, reiciendis rem
                    tenetur enim ratione atque iure. Voluptas dicta dolores incidunt blanditiis
                    eveniet praesentium expedita ullam voluptatibus, labore ea maxime laborum odit
                    amet aut delectus aspernatur tenetur eum adipisci corrupti molestias inventore
                    repellendus. Maxime, excepturi. Atque explicabo totam perferendis doloribus
                    veritatis, tenetur, consectetur sunt possimus repellat quaerat labore
                    consequatur soluta! Unde nostrum ad iure minus officiis, amet odit. Numquam.
                  </p>
                  <p className="text-gray-800 text-base font-normal leading-loose pb-3 pt-1 px-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, nostrum
                    molestias consectetur dignissimos soluta possimus odio. Non cum aliquam, ipsam
                    ratione neque laboriosam sint dolores ipsa! Non, nesciunt cum animi adipisci
                    explicabo, nostrum blanditiis ab, consequatur dolor error eius distinctio est
                    vel nemo sequi dignissimos repellendus accusamus unde similique. Eaque deleniti
                    nobis eius rerum necessitatibus facilis a, soluta atque quidem magnam tempore,
                    ad tenetur aliquid error aspernatur iste labore ea!
                  </p>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex h-auto w-full flex-col group/design-root overflow-x-hidden bg-zinc-100">
        <div className="container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center pb-8">
            <div className="flex flex-col flex-1">
              <main className="border shadow-lg rounded-lg overflow-hidden bg-white">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                  <div className="flex min-w-72 flex-col gap-4 mx-auto">
                    <h1 className="text-primary text-3xl md:text-4xl font-black leading-tight tracking-tighter">
                      Меморандумы
                    </h1>
                  </div>
                </div>
                <div className='p-4'>
                  <Carousel
                    slideSize="25%"
                    withControls={false}
                    slideGap={16}
                    align="start"
                    loop
                    breakpoints={[
                      { maxWidth: 'md', slideSize: '50%' },
                      { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                    ]}
                    className="max-w-xs sm:max-w-sm md:max-w-full mx-auto"
                  >
                    {Array(8)
                      .fill(1)
                      .map((_, i) => {
                        return (
                          <Carousel.Slide key={i}>
                            <div className="flex flex-col gap-4 rounded-xl bg-background-light shadow-sm overflow-hidden">
                              <Image
                                className="md:max-w-full aspect-video "
                                src="https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-simple-solid-color-on-gray-background-image_557017.jpg"
                              />
                              {/* <img
                          alt=""
                          data-alt="A breathtaking mountain landscape in Kazakhstan with a turquoise lake."
                        /> */}
                              <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                                <div>
                                  <p className="text-primary text-base font-medium leading-normal">
                                    Исследуйте Пейзажи
                                  </p>
                                  <p className="text-[#4c669a] text-sm font-normal leading-normal">
                                    Поддержите сохранение природных чудес.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Carousel.Slide>
                        )
                      })}
                  </Carousel>
                  <Carousel
                    slideSize="25%"
                    withControls={false}
                    slideGap={16}
                    align="start"
                    loop
                    breakpoints={[
                      { maxWidth: 'md', slideSize: '50%' },
                      { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                    ]}
                    className="max-w-xs sm:max-w-sm md:max-w-full mx-auto mt-4"
                  >
                    {Array(8)
                      .fill(1)
                      .map((_, i) => {
                        return (
                          <Carousel.Slide key={i}>
                            <div className="flex flex-col gap-4 rounded-xl bg-background-light shadow-sm overflow-hidden">
                              <Image
                                className="md:max-w-full aspect-video "
                                src="https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-simple-solid-color-on-gray-background-image_557017.jpg"
                              />
                              {/* <img
                          alt=""
                          data-alt="A breathtaking mountain landscape in Kazakhstan with a turquoise lake."
                        /> */}
                              <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                                <div>
                                  <p className="text-primary text-base font-medium leading-normal">
                                    Исследуйте Пейзажи
                                  </p>
                                  <p className="text-[#4c669a] text-sm font-normal leading-normal">
                                    Поддержите сохранение природных чудес.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Carousel.Slide>
                        )
                      })}
                  </Carousel>
                  <Carousel
                    slideSize="25%"
                    withControls={false}
                    slideGap={16}
                    align="start"
                    loop
                    breakpoints={[
                      { maxWidth: 'md', slideSize: '50%' },
                      { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                    ]}
                    className="max-w-xs sm:max-w-sm md:max-w-full mx-auto mt-4"
                  >
                    {Array(8)
                      .fill(1)
                      .map((_, i) => {
                        return (
                          <Carousel.Slide key={i}>
                            <div className="flex flex-col gap-4 rounded-xl bg-background-light shadow-sm overflow-hidden">
                              <Image
                                className="md:max-w-full aspect-video "
                                src="https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-simple-solid-color-on-gray-background-image_557017.jpg"
                              />
                              {/* <img
                          alt=""
                          data-alt="A breathtaking mountain landscape in Kazakhstan with a turquoise lake."
                        /> */}
                              <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                                <div>
                                  <p className="text-primary text-base font-medium leading-normal">
                                    Исследуйте Пейзажи
                                  </p>
                                  <p className="text-[#4c669a] text-sm font-normal leading-normal">
                                    Поддержите сохранение природных чудес.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Carousel.Slide>
                        )
                      })}
                  </Carousel>
                </div>
                {/* <div className="space-y-6 mt-4">
                  <p className="text-gray-800 text-base font-normal leading-loose pb-3 pt-1 px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nihil
                    veritatis nemo consectetur consequatur! Ducimus perferendis culpa sed, dolorum
                    impedit minima. Repellendus, vero perferendis quis autem perspiciatis fugit
                    pariatur optio vitae dignissimos odit! Quo beatae vel animi vitae. Nisi ut
                    iste ad explicabo voluptatibus quaerat eum. Deserunt quis praesentium totam
                    excepturi quas iste velit odio animi sunt accusantium distinctio molestiae ad
                    esse nisi ab hic inventore magni similique quo, eos quisquam porro voluptatum!
                    Saepe unde hic consectetur architecto tenetur suscipit blanditiis libero natus
                    cum! Minus iure, facilis tempora pariatur dolorem dolorum animi aliquid porro
                    natus? Ducimus eligendi eos officia suscipit.
                  </p>
                  <p className="text-gray-800 text-base font-normal leading-loose pb-3 pt-1 px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eum nemo
                    soluta ipsum veritatis sint rerum quis vel earum molestias laudantium,
                    reiciendis rem tenetur enim ratione atque iure. Voluptas dicta dolores
                    incidunt blanditiis eveniet praesentium expedita ullam voluptatibus, labore ea
                    maxime laborum odit amet aut delectus aspernatur tenetur eum adipisci corrupti
                    molestias inventore repellendus. Maxime, excepturi. Atque explicabo totam
                    perferendis doloribus veritatis, tenetur, consectetur sunt possimus repellat
                    quaerat labore consequatur soluta! Unde nostrum ad iure minus officiis, amet
                    odit. Numquam.
                  </p>
                  <p className="text-gray-800 text-base font-normal leading-loose pb-3 pt-1 px-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, nostrum
                    molestias consectetur dignissimos soluta possimus odio. Non cum aliquam, ipsam
                    ratione neque laboriosam sint dolores ipsa! Non, nesciunt cum animi adipisci
                    explicabo, nostrum blanditiis ab, consequatur dolor error eius distinctio est
                    vel nemo sequi dignissimos repellendus accusamus unde similique. Eaque
                    deleniti nobis eius rerum necessitatibus facilis a, soluta atque quidem magnam
                    tempore, ad tenetur aliquid error aspernatur iste labore ea!
                  </p>
                </div> */}
              </main>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex h-auto w-full flex-col group/design-root overflow-x-hidden bg-zinc-100">
        <div className="container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center pb-8">
            <div className="flex flex-col flex-1">
              <main className="border shadow-lg rounded-lg overflow-hidden bg-white">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                  <div className="flex min-w-72 flex-col gap-4 mx-auto">
                    <h1 className="text-primary text-3xl md:text-4xl font-black leading-tight tracking-tighter">
                      Наши реквизиты
                    </h1>
                  </div>
                </div>
                <div className="space-y-6 mt-4">
                  <p className="text-gray-800 text-base font-normal leading-loose pb-3 pt-1 px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nihil
                    veritatis nemo consectetur consequatur! Ducimus perferendis culpa sed, dolorum
                    impedit minima. Repellendus, vero perferendis quis autem perspiciatis fugit
                    pariatur optio vitae dignissimos odit! Quo beatae vel animi vitae. Nisi ut iste
                    ad explicabo voluptatibus quaerat eum. Deserunt quis praesentium totam excepturi
                    quas iste velit odio animi sunt accusantium distinctio molestiae ad esse nisi ab
                    hic inventore magni similique quo, eos quisquam porro voluptatum! Saepe unde hic
                    consectetur architecto tenetur suscipit blanditiis libero natus cum! Minus iure,
                    facilis tempora pariatur dolorem dolorum animi aliquid porro natus? Ducimus
                    eligendi eos officia suscipit.
                  </p>
                  <p className="text-gray-800 text-base font-normal leading-loose pb-3 pt-1 px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eum nemo soluta
                    ipsum veritatis sint rerum quis vel earum molestias laudantium, reiciendis rem
                    tenetur enim ratione atque iure. Voluptas dicta dolores incidunt blanditiis
                    eveniet praesentium expedita ullam voluptatibus, labore ea maxime laborum odit
                    amet aut delectus aspernatur tenetur eum adipisci corrupti molestias inventore
                    repellendus. Maxime, excepturi. Atque explicabo totam perferendis doloribus
                    veritatis, tenetur, consectetur sunt possimus repellat quaerat labore
                    consequatur soluta! Unde nostrum ad iure minus officiis, amet odit. Numquam.
                  </p>
                  <p className="text-gray-800 text-base font-normal leading-loose pb-3 pt-1 px-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, nostrum
                    molestias consectetur dignissimos soluta possimus odio. Non cum aliquam, ipsam
                    ratione neque laboriosam sint dolores ipsa! Non, nesciunt cum animi adipisci
                    explicabo, nostrum blanditiis ab, consequatur dolor error eius distinctio est
                    vel nemo sequi dignissimos repellendus accusamus unde similique. Eaque deleniti
                    nobis eius rerum necessitatibus facilis a, soluta atque quidem magnam tempore,
                    ad tenetur aliquid error aspernatur iste labore ea!
                  </p>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
