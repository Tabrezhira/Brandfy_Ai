"use client"

import React, { useContext } from "react";
import { useState } from "react";
import aiModelLists from "../../shared/AiModelList.jsx";
import Image from "next/image"; // Add this import
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from "@/components/ui/select";

import { Lock, LockIcon, MessageSquare } from "lucide-react";
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext.js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig.js";
import { useUser } from "@clerk/nextjs";
import { DefaultModel } from "@/shared/AiModels.jsx";
function AiMultiModels() {
  const {user} = useUser();
  const [aiModelList, setAiModelList] = useState(aiModelLists);
  const {aiSelectedModels, setAiSelectedModel} = useContext(AiSelectedModelContext);
  const onToggleChange = (model, value) => {
    setAiModelList((prevList) =>
      prevList.map((item) =>
        item.model === model ? { ...item, enable: value } : item
      )
    );
    setAiModelList((prev) => ({
      ...prev, 
    }))
  };

  const onselecteValue = async (model, value) => {
    const newSelectedModels = {
      ...aiSelectedModels,
      [model]: { modelId: value }
    };
    setAiSelectedModel(newSelectedModels);

    // Update to Firebase Database
    const docRef = doc(db, "users", user?.primaryEmailAddress?.emailAddress);
    await updateDoc(docRef, {
      SelectedModelsPref: newSelectedModels
    });
  }

  return (
    <div className="flex flex-1 h-[75vh] border-b">
      {aiModelList.map((model, index) => (
        <div
          key={index}
          className={`flex flex-col items-center  border-r h-full overflow-auto ${
            model.enable ? "flex-1 min-w-[400px]" : "w-[100px] flex-none"
          }`}
        >
          <div className="flex w-full h-[70px] border-b items-center justify-between border-r p-4 ">
            <div className="flex items-center gap-4">
              <Image
                src={model.icon}
                alt={model.model}
                width={24}
                height={24}
              />
               
              {model.enable && (
                <Select
  value={aiSelectedModels?.[model.model]?.modelId ?? model.subModel[0]?.id ?? ""}
  onValueChange={(value) => onselecteValue(model.model, value)}
>
                  <SelectTrigger className="w-[180px] cursor-pointer">
                    <SelectValue placeholder={aiSelectedModels?.[model.model]?.modelId ?? model.subModel[0]?.id ?? "" } />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="px-3">
                      <SelectLabel>Free</SelectLabel>
                    {model.subModel.map((sub, subIndex) => sub.premium==false && (
                      <SelectItem key={subIndex} value={sub.id} className="cursor-pointer">
                        {sub.name}
                      </SelectItem>
                    ))}
                    </SelectGroup>
                                        <SelectGroup className="px-3">
                      <SelectLabel>Premium</SelectLabel>
                    {model.subModel.map((sub, subIndex) => sub.premium==true && (
                      <SelectItem key={subIndex} value={sub.id} disabled={sub.premium}>
                        {sub.name}{sub.premium && <LockIcon className="h-4 w-4"/>}
                      </SelectItem>
                    ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div>
              {model.enable ? (
                <Switch className={"cursor-pointer"}
                  checked={model.enable}
                  onCheckedChange={(value) =>
                    onToggleChange(model.model, value)
                  }
                />
              ) : (
                <MessageSquare className="cursor-pointer"
                  onClick={() => onToggleChange(model.model, true)}
                />
              )}
            </div>
          </div>
          {model.premium && model.enable && (
            <div className=" flex items-center justify-between h-full ">
              <Button className='cursor-pointer'>
                {" "}
                <Lock /> Upgrade to unlock
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AiMultiModels;
