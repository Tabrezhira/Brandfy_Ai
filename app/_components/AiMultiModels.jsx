"use client";

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
  SelectLabel,
} from "@/components/ui/select";

import { Loader, Lock, LockIcon, MessageSquare } from "lucide-react";
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext.js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig.js";
import { useUser } from "@clerk/nextjs";
import { DefaultModel } from "@/shared/AiModels.jsx";
import AiModelList from "../../shared/AiModelList.jsx";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
function AiMultiModels() {
  const { user } = useUser();
  const [aiModelList, setAiModelList] = useState(aiModelLists);
  const { aiSelectedModels, setAiSelectedModel, messages, setMessages } =
    useContext(AiSelectedModelContext);
  const onToggleChange = (model, value) => {
    setAiModelList((prevList) =>
      prevList.map((item) =>
        item.model === model ? { ...item, enable: value } : item
      )
    );
    // setAiModelLists((prev) => {
    //   prev.map((m) => m.model === model ? { ...m, enable: value } : m);
    // });
    setAiSelectedModel((prev) => ({
      ...prev,
      [model]: {
        ...(prev?.[model]??{}),
        enabled: value,
      }
    }));
  }


  console.log("Selected Models from Context:", aiSelectedModels);
  async function onSelectValue(model, value) {
    console.log("Selected model:", model, "Value:", value);
      const newSelectedModels = {
        ...aiSelectedModels,
        [model]: { modelId: value },
      };
      setAiSelectedModel(newSelectedModels);

      // Update to Firebase Database
      const docRef = doc(db, "users", user?.primaryEmailAddress?.emailAddress);
      await updateDoc(docRef, {
        SelectedModelsPref: newSelectedModels,
      });
    }

  return (
    <div className="flex flex-1 h-[75vh] border-b  ">
      {aiModelList.map((model, index) => (
        <div
          key={index}
          className={`flex flex-col items-center  border-r h-full overflow-auto  ${
            model.enable ? "flex-1 min-w-[400px]" : "w-[100px] flex-none"
          }`}
        >
          <div className="flex w-full bg-amber-100 h-[70px] border-b items-center justify-between border-r p-4 ">
            <div className="flex items-center gap-4">
              <Image
                src={model.icon}
                alt={model.model}
                width={24}
                height={24}
              />

              {model.enable && (
                <Select
                  value={
                    aiSelectedModels?.[model.model]?.modelId ??
                    model.subModel[0]?.id ??
                    ""
                  }
                  onValueChange={(value) =>onSelectValue(model.model, value)}
                >
                  <SelectTrigger className="w-[180px] cursor-pointer">
                    <SelectValue
                      placeholder={
                        aiSelectedModels?.[model.model]?.modelId ??
                        model.subModel[0]?.id ??
                        ""
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="px-3">
                      <SelectLabel>Free</SelectLabel>
                      {model.subModel.map(
                        (sub, subIndex) =>
                          sub.premium == false && (
                            <SelectItem
                              key={subIndex}
                              value={sub.id}
                              className="cursor-pointer"
                            >
                              {sub.name}
                            </SelectItem>
                          )
                      )}
                    </SelectGroup>
                    <SelectGroup className="px-3">
                      <SelectLabel>Premium</SelectLabel>
                      {model.subModel.map(
                        (sub, subIndex) =>
                          sub.premium == true && (
                            <SelectItem
                              key={subIndex}
                              value={sub.id}
                              disabled={sub.premium}
                            >
                              {sub.name}
                              {sub.premium && <LockIcon className="h-4 w-4" />}
                            </SelectItem>
                          )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div>
              {model.enable ? (
                <Switch
                  className={"cursor-pointer"}
                  checked={model.enable}
                  onCheckedChange={(value) =>
                    onToggleChange(model.model, value)
                  }
                />
              ) : (
                <MessageSquare
                  className="cursor-pointer"
                  onClick={() => onToggleChange(model.model, true)}
                />
              )}
            </div>
          </div>
          <div className="h-full w-full flex items-center justify-center">
            {model.premium && model.enable && (
              <div className=" flex items-center justify-between h-full  ">
                <Button className="cursor-pointer">
                  {" "}
                  <Lock /> Upgrade to unlock
                </Button>
              </div>
            )}
            <div className="flex-1 h-full p-4">
             {model.enable && <div className="flex-1 p-4 space-y-2">
                {messages[model.model]?.map((m, i) => (
                  <div
                    className={`p-2 rounded-md ${
                      m.role == "user"
                        ? "bg-blue-100 text-blue-900"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {m.role == "assistant" && (
                      <span className="text-sm text-gray-400">
                        {m.model ?? model.model}
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      {m.content == "Thinking..." && (
                        <>
                          {" "}
                          <Loader className="animate-spin h-4 w-4 " />{" "}
                          <span>Thinking...</span>
                        </>
                      )}
                    </div>

                    {m.content !== "Thinking..." && <Markdown remarkPlugins={[remarkGfm]}>{m.content}</Markdown>}
                  </div>
                ))}
              </div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AiMultiModels;
