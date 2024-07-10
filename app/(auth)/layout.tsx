export default function({children}:{
    children: React.ReactNode
}){
    return  <div>
        <div className="p-1 text-center border-b bg-black text-yellow-300">
            20% off on all products
        </div>
        {children}
    </div>
}