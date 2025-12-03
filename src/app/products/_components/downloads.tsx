import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IDownload, IDownloadCategory } from '@/types/IProduct'
import { DownloadCategory } from '@/types/IProductBySlug'
import { Icon } from '@iconify/react'
import { Info } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Downloads({ downloads, categories }: { downloads: IDownload[], categories?: DownloadCategory }) {

    if (!downloads || downloads.length === 0) return null

    // Helper function to format file size
    const formatFileSize = (bytes: string) => {
        const size = parseInt(bytes);
        if (size >= 1073741824) return (size / 1073741824).toFixed(2) + ' GB';
        if (size >= 1048576) return (size / 1048576).toFixed(2) + ' MB';
        if (size >= 1024) return (size / 1024).toFixed(2) + ' KB';
        return size + ' bytes';
    };

    // Helper function to format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Filter downloads by file type for categorization
    const softwareDownloads = downloads.filter(d => d.fileType === 'exe' || d.fileType === 'msi' || d.fileType === 'dmg');
    const manualDownloads = downloads.filter(d => d.fileType === 'pdf' && d.title.toLowerCase().includes('manual'));
    const cadDownloads = downloads.filter(d => d.fileType === 'dwg' || d.fileType === 'dxf' || d.title.toLowerCase().includes('cad'));
    const otherDownloads = downloads.filter(d =>
        !softwareDownloads.includes(d) &&
        !manualDownloads.includes(d) &&
        !cadDownloads.includes(d)
    );

    // Determine default tab
    const defaultTab = softwareDownloads.length > 0 ? 'software' :
        manualDownloads.length > 0 ? 'manual' :
            cadDownloads.length > 0 ? 'cad-drawings' : 'other';

    const DownloadCard = ({ download }: { download: IDownload }) => (
        <div className="py-6  border-b last:border-b-0">
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className='text-lg font-semibold text-primary'>{download.title}</h3>
                        {download.deprecated && (
                            <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">Deprecated</span>
                        )}
                    </div>
                    <p className='text-gray-600 max-w-2xl'>{download.summary}</p>
                    {download.minOsVersion && (
                        <p className="text-sm text-gray-600 mt-2">Minimum OS: {download.minOsVersion}</p>
                    )}
                </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 text-sm">
                <div>
                    <span className="">Version:</span>
                    <p className="font-medium">{download.version}</p>
                </div>
                <div>
                    <span className="">Size:</span>
                    <p className="font-medium">{formatFileSize(download.sizeBytes)}</p>
                </div>
                <div>
                    <span className="">Released:</span>
                    <p className="font-medium">{formatDate(download.releasedOn)}</p>
                </div>
                <div>
                    <span className="">Platform:</span>
                    <p className="font-medium">{download.platforms.join(', ')}</p>
                </div>
            </div>


            <div className="flex gap-3 pt-2 mt-6">
                <a
                    href={download.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='flex gap-2 items-center bg-transparent hover:bg-primary text-primary border border-primary px-4 py-2 rounded-full hover:text-white transition-colors'
                >
                    <Icon icon="streamline-flex:download-tray" />
                    Download
                </a>


                {download.mirrors && download.mirrors.length > 0 && (
                    <div className="flex gap-2">
                        {download?.mirrors?.map((mirror, idx) => {
                            if (!mirror.url) return null;

                            return (
                            <a
                                key={idx}
                                href={mirror.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='flex gap-2 items-center bg-transparent hover:bg-gray-100 text-gray-600 border border-gray-300 px-4 py-2 rounded-full transition-colors text-sm'
                            >
                                {mirror.label}
                            </a>
                            )
                        })}
                    </div>
                )}



            </div>

            {download.extra?.note && (
                <p className="text-sm mt-4 flex gap-2 items-center italic"><span><Info className='size-4' /></span> {download.extra.note}</p>
            )}
        </div>
    );

    return (
        <section className='space-y-6'>
            <h2 className='text-2xl md:text-3xl font-semibold'>Downloads</h2>

            <Tabs defaultValue={defaultTab}>
                {/* <TabsList className='h-full rounded-full text-zinc-800 flex-wrap'>
                    {softwareDownloads.length > 1 && (
                        <TabsTrigger
                            className='rounded-full text-[16px] data-[state=active]:bg-primary data-[state=active]:text-white py-2 px-4'
                            value="software"
                        >
                            Software ({softwareDownloads.length})
                        </TabsTrigger>
                    )}
                    {manualDownloads.length > 0 && (
                        <TabsTrigger
                            className='rounded-full text-[16px] data-[state=active]:bg-primary data-[state=active]:text-white py-2 px-4'
                            value="manual"
                        >
                            Manual ({manualDownloads.length})
                        </TabsTrigger>
                    )}
                    {cadDownloads.length > 0 && (
                        <TabsTrigger
                            className='rounded-full text-[16px] data-[state=active]:bg-primary data-[state=active]:text-white py-2 px-4'
                            value="cad-drawings"
                        >
                            CAD Drawings ({cadDownloads.length})
                        </TabsTrigger>
                    )}
                    {otherDownloads.length > 0 && (
                        <TabsTrigger
                            className='rounded-full text-[16px] data-[state=active]:bg-primary data-[state=active]:text-white py-2 px-4'
                            value="other"
                        >
                            Other ({otherDownloads.length})
                        </TabsTrigger>
                    )}
                </TabsList> */}

                {softwareDownloads.length > 0 && (
                    <TabsContent value='software' className='w-full max-w-4xl'>
                        {softwareDownloads.map((download) => (
                            <DownloadCard key={download.id} download={download} />
                        ))}
                    </TabsContent>
                )}

                {manualDownloads.length > 0 && (
                    <TabsContent value='manual' className='w-full max-w-4xl'>
                        {manualDownloads.map((download) => (
                            <DownloadCard key={download.id} download={download} />
                        ))}
                    </TabsContent>
                )}

                {cadDownloads.length > 0 && (
                    <TabsContent value='cad-drawings' className='w-full max-w-4xl'>
                        {cadDownloads.map((download) => (
                            <DownloadCard key={download.id} download={download} />
                        ))}
                    </TabsContent>
                )}

                {otherDownloads.length > 0 && (
                    <TabsContent value='other' className='w-full max-w-4xl'>
                        {otherDownloads.map((download) => (
                            <DownloadCard key={download.id} download={download} />
                        ))}
                    </TabsContent>
                )}
            </Tabs>
        </section>
    )
}
