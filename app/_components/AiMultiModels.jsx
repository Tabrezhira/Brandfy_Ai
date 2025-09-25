import React from "react";
import { useState } from "react";
import aiModelLists from "../../shared/AiModelList.jsx";
import Image from "next/image"; // Add this import
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock, MessageSquare } from "lucide-react";
function AiMultiModels() {
  const [aiModelList, setAiModelList] = useState(aiModelLists);
  const onToggleChange = (model, value) => {
    setAiModelList((prevList) =>
      prevList.map((item) =>
        item.model === model ? { ...item, enable: value } : item
      )
    );
  };
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
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={model.subModel[0].name} />
                  </SelectTrigger>
                  <SelectContent>
                    {model.subModel.map((sub, subIndex) => (
                      <SelectItem key={subIndex} value={sub.name}>
                        {sub.name}
                      </SelectItem>
                    ))}
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
