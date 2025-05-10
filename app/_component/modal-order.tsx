"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FreelanceOrderModal() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "website",
    description: "",
    budget: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleProjectTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, projectType: value }));
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Format email tidak valid";
        }
        break;
      case "description":
        if (value.length < 10) {
          error = "Deskripsi minimal 10 karakter";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = { ...errors };
    Object.keys(formData).forEach((key) => {
      if (key !== "budget") {
        validateField(key, formData[key as keyof typeof formData]);
        if (newErrors[key as keyof typeof errors]) {
          formValid = false;
        }
      }
    });

    if (formValid) {
      console.log({ ...formData, deadline: date });
      setOpen(false);
      setFormData({
        name: "",
        email: "",
        projectType: "website",
        description: "",
        budget: "",
      });
      setDate(undefined);
      setErrors({ name: "", email: "", description: "" });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-end flex-col items-end">
          <Button
            variant={"secondary"}
            size="lg"
            className="font-semibold flex items-center cursor-pointer"
          >
            Hire Me <span className="mr-2 text-xl">😊</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl">
              Biarkan saya membantu kamu!
            </DialogTitle>
            <DialogDescription>
              Pastiin kamu mengisi form dengan benar ya 😊
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
              {errors.name && (
                <p className="text-red-500 col-span-4 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
              {errors.email && (
                <p className="text-red-500 col-span-4 text-sm">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Jenis Proyek</Label>
              <RadioGroup
                value={formData.projectType}
                onValueChange={handleProjectTypeChange}
                className="col-span-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="website" id="website" />
                  <Label htmlFor="website">Website</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile-app" id="mobile-app" />
                  <Label htmlFor="mobile-app">Aplikasi Mobile</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="design" id="design" />
                  <Label htmlFor="design">Desain</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Lainnya</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Deskripsi
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
                rows={4}
                required
              />
              {errors.description && (
                <p className="text-red-500 col-span-4 text-sm">
                  {errors.description}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="budget" className="text-right">
                Budget
              </Label>
              <Input
                id="budget"
                name="budget"
                type="text"
                placeholder="$"
                value={formData.budget}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "col-span-3 justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      date.toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    ) : (
                      <span>Pilih tanggal</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Pesan Sekarang</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
