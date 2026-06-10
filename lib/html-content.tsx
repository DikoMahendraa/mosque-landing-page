import parse from 'html-react-parser'
import Link from 'next/link'

interface HtmlContentProps {
    content: string
    maxLength?: number
    detailLink?: string
    className?: string
}

export default function HtmlContent({
    content,
    maxLength = 300,
    detailLink,
    className = ""
}: HtmlContentProps) {
    const plainText = content.replace(/<[^>]+>/g, '')
    const isTruncated = plainText.length > maxLength

    if (!isTruncated || !detailLink) {
        return <div className={className}>{parse(content)}</div>
    }

    const truncated = plainText.substring(0, maxLength).trim()

    return (
        <div className={className}>
            {truncated}...
            <Link
                href={detailLink}
                className="text-black/50 hover:underline font-medium ml-1"
                onClick={(e) => e.stopPropagation()}
            >
                Lihat selengkapnya
            </Link>
        </div>
    )
}