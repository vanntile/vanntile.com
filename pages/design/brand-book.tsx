import { NextPage } from 'next'
import Image, { ImageProps } from 'next/image'
import p1 from '../../public/images/deck/page.1.webp'
import p2 from '../../public/images/deck/page.2.webp'
import p3 from '../../public/images/deck/page.3.webp'
import p4 from '../../public/images/deck/page.4.webp'
import p5 from '../../public/images/deck/page.5.webp'
import p6 from '../../public/images/deck/page.6.webp'
import p7 from '../../public/images/deck/page.7.webp'
import p8 from '../../public/images/deck/page.8.webp'
import p9 from '../../public/images/deck/page.9.webp'
import p10 from '../../public/images/deck/page.10.webp'
import p11 from '../../public/images/deck/page.11.webp'
import p12 from '../../public/images/deck/page.12.webp'
import p13 from '../../public/images/deck/page.13.webp'
import p14 from '../../public/images/deck/page.14.webp'
import p15 from '../../public/images/deck/page.15.webp'
import p16 from '../../public/images/deck/page.16.webp'
import p17 from '../../public/images/deck/page.17.webp'
import p18 from '../../public/images/deck/page.18.webp'
import p19 from '../../public/images/deck/page.19.webp'
import p20 from '../../public/images/deck/page.20.webp'
import p21 from '../../public/images/deck/page.21.webp'
import p22 from '../../public/images/deck/page.22.webp'
import p23 from '../../public/images/deck/page.23.webp'
import p24 from '../../public/images/deck/page.24.webp'

type ImageSrcDesc = Pick<ImageProps, 'src' | 'alt'>

const images: ImageSrcDesc[] = [
  {
    src: p1,
    alt: 'vanntile brand deck cover page',
  },
  {
    src: p2,
    alt: 'brand deck project description',
  },
  {
    src: p3,
    alt: 'brand personality',
  },
  {
    src: p4,
    alt: 'logo',
  },
  {
    src: p5,
    alt: 'logo with primary version color scheme',
  },
  {
    src: p6,
    alt: 'logomark with primary version color scheme',
  },
  {
    src: p7,
    alt: 'logo with monochrome color scheme',
  },
  {
    src: p8,
    alt: 'logomark assembly from shapes',
  },
  {
    src: p9,
    alt: 'logo grid overlap',
  },
  {
    src: p10,
    alt: 'step by step visual refinement of logo',
  },
  {
    src: p11,
    alt: 'adaptability of the logo',
  },
  {
    src: p12,
    alt: 'logo construction: tyeface sizing',
  },
  {
    src: p13,
    alt: 'logo construction: spacing',
  },
  {
    src: p14,
    alt: 'logo construction: whitespace',
  },
  {
    src: p15,
    alt: 'all logo versions',
  },
  {
    src: p16,
    alt: 'brand color palette',
  },
  {
    src: p17,
    alt: 'brand typography',
  },
  {
    src: p18,
    alt: 'main shape pattern',
  },
  {
    src: p19,
    alt: 'secondary brand patterns',
  },
  {
    src: p20,
    alt: 'signs and expressions of the logo',
  },
  {
    src: p21,
    alt: 'iconography',
  },
  {
    src: p22,
    alt: 'stationery usage of the brand elements',
  },
  {
    src: p23,
    alt: 'social media usage',
  },
  {
    src: p24,
    alt: 'profile page mockup',
  },
]

const BrandBook: NextPage = () => (
  <div className="relative w-screen h-screen py-4 bg-gray-900">
    <div className="relative h-full overflow-y-scroll snap snap-y snap-mandatory max-w-screen-2xl">
      {images.map(({ src, alt }: ImageSrcDesc) => (
        <div key={alt?.replace(' ', '_')} className="relative h-full snap-center">
          <Image layout="fill" objectFit="contain" src={src} alt={alt} unoptimized={true} lazyBoundary="4000px" />
        </div>
      ))}
    </div>
  </div>
)

export default BrandBook
