import { UsePrContext } from "../../util/context"
import { useState, useEffect, forwardRef, useRef } from "react"
import { createPortal } from "react-dom"
import { usePopper } from "react-popper";
interface SearchMaterialPopOutProps {
    searchMaterial: string,
    isSearchOpen: boolean
    OnBlur: () => void
    OnSelected: (e:{name: string, materialId: number, purchaseUnit: string, type: string}) => void
    anchorEl: HTMLDivElement | null
}

// type prItemSelect = {
//     raw_material_id: string,
//     name: string,
//     purchase_unit: string,
//     type: string
// }

export const SearchMaterialPopOut = forwardRef<HTMLDivElement, SearchMaterialPopOutProps>(
    ({ searchMaterial, isSearchOpen, OnBlur, OnSelected, anchorEl }, ) => {
    const {prList, } = UsePrContext();
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const popperElementRef= useRef<HTMLElement | null>(null);

    const { styles, attributes } = usePopper(anchorEl as HTMLElement | null, popperElement, {
        placement: "bottom-start",
        
    });

    const setRefs = (node: HTMLDivElement) => {
        // Set both refs
        popperElementRef.current = node;
        setPopperElement(node);
      };
    
    
    useEffect(() => {
        let handler = (event : MouseEvent) => {
            if (popperElementRef.current && !popperElementRef.current.contains(event.target as Node)) {
                OnBlur();
              }
                    
        }
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])
    function handleSelect(e:{name: string, materialId: number, purchaseUnit: string, type: string}) {
        OnBlur();
        console.log(e);
        OnSelected(e);
    }


    const filteredPrList = prList.raw_materials.filter((item: any) => item.name.toLowerCase().includes(searchMaterial.toLowerCase())) || [];

  return createPortal(
    <>
    {isSearchOpen && 
        <div 
            ref={setRefs}
            style={styles.popper}
            className="overflow-y-auto 
                text-sm font-light top-full left-0 w-[15rem] max-h-[10rem] z-[999] border rounded-md mt-3 bg-slate-400 px-2 py-2 scrollbar-popSearch" 
            onBlur={OnBlur}
            tabIndex={-1}
            {...attributes.popper}
            >
        {filteredPrList.length > 0 ? filteredPrList.map((item: any) => (
            <div  key={item.id} className="cursor-pointer hover:bg-slate-600 hover:text-slate-100 mt-2">
                <p onClick={() => 
                    handleSelect(
                        {name: item.name, materialId: item.id, purchaseUnit: item.purchase_unit, type: item.type}
                        )}>{item.name}</p>
            </div>
        )) : <p>No results found</p>}
    </div>}
    </>, document.body
  )

})
