import { on } from "events"
import { UsePrContext } from "../../util/context"
import { useState } from "react"
interface SearchMaterialPopOutProps {
    searchMaterial: string,
    isSearchOpen: boolean
    OnBlur: () => void
    OnSelected: (e:{name: string, materialId: number, purchaseUnit: string, type: string}) => void
}

type prItemSelect = {
    raw_material_id: string,
    name: string,
    purchase_unit: string,
    type: string
}

export const SearchMaterialPopOut: React.FC<SearchMaterialPopOutProps> = ({ searchMaterial, isSearchOpen, OnBlur, OnSelected}) => {
    const {prList, setPrList} = UsePrContext();


    function handleSelect(e:{name: string, materialId: number, purchaseUnit: string, type: string}) {
        OnBlur();
        console.log(e);
        OnSelected(e);
    }


    const filteredPrList = prList.raw_materials.filter((item: any) => item.name.toLowerCase().includes(searchMaterial.toLowerCase()));

  return (
    <>
    {isSearchOpen && 
        <div 
            className="absolute overflow-auto text-sm font-light top-full left-0 w-full max-h-[20rem] z-[999] border rounded-md mt-3 bg-slate-300 px-2 py-2" 
            onBlur={OnBlur}
            tabIndex={-1}
            >
        {filteredPrList.length > 0 ? filteredPrList.map((item: any) => (
            <div key={item.id} className="cursor-pointer hover:bg-slate-400 hover:text-slate-100 mt-2">
                <p onClick={() => 
                    handleSelect(
                        {name: item.name, materialId: item.id, purchaseUnit: item.purchase_unit, type: item.type}
                        )}>{item.name}</p>
            </div>
        )) : <p>No results found</p>}
    </div>}
    </>
  )
}
