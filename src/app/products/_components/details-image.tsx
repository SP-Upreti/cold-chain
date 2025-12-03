import Image from "next/image";

export default function DetailsImage({ images }: { images: string[] | undefined }) {
    return (
        <div className="grid lg:grid-cols-2 gap-4">
            <h2 className="text-xl lg:text-3xl font-semibold col-span-2">Details</h2>
            {
                images?.map((image, index) => (
                    <div className="w-full bg-muted/80" key={index}>
                        <Image

                            src={image}
                            alt="product"
                            width={500}
                            height={500}
                            className="w-full  h-full object-cover"
                        />
                    </div>
                ))
            }
        </div>
    )
}