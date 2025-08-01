const Skeleton = ({ className }: { className?: string }) => {
    return <div className={`animate-pulse bg-gray-200 ${className}`} />
}

export default Skeleton;