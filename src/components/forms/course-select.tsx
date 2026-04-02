"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { courses, categories } from "@/data/courses";

interface CourseSelectProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
}

export function CourseSelect({
  value = [],
  onValueChange,
  placeholder = "Select courses...",
}: CourseSelectProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [popupStyle, setPopupStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Group courses by category
  const groupedCourses = categories
    .map((category) => ({
      category: category.name,
      categorySlug: category.slug,
      courses: courses.filter((course) => course.categorySlug === category.slug),
    }))
    .filter((group) => group.courses.length > 0);

  // Close dropdown when clicking outside
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedTrigger = containerRef.current?.contains(target);
      const clickedDropdown = dropdownRef.current?.contains(target);

      if (!clickedTrigger && !clickedDropdown) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function updatePopupPosition() {
      const rect = triggerRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      setPopupStyle({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    }

    updatePopupPosition();

    window.addEventListener("resize", updatePopupPosition);
    window.addEventListener("scroll", updatePopupPosition, true);

    return () => {
      window.removeEventListener("resize", updatePopupPosition);
      window.removeEventListener("scroll", updatePopupPosition, true);
    };
  }, [open]);

  const toggleCourse = (courseTitle: string) => {
    if (value.includes(courseTitle)) {
      onValueChange(value.filter((v) => v !== courseTitle));
    } else {
      onValueChange([...value, courseTitle]);
    }
  };

  const removeCourse = (courseTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange(value.filter((v) => v !== courseTitle));
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={cn(
          "flex min-h-12 w-full items-center justify-between rounded-lg border border-input bg-transparent px-4 py-3 text-sm transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {value.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            value.map((courseTitle) => (
              <span
                key={courseTitle}
                className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                {courses.find((c) => c.title === courseTitle)?.shortTitle || courseTitle}
                <button
                  type="button"
                  onClick={(e) => removeCourse(courseTitle, e)}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>

      {/* Dropdown */}
      {open && mounted && popupStyle &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[9999] rounded-lg border bg-popover shadow-lg"
            style={{
              top: popupStyle.top,
              left: popupStyle.left,
              width: popupStyle.width,
            }}
          >
          <div className="max-h-[300px] overflow-y-auto p-1">
            {groupedCourses.map((group) => (
              <div key={group.categorySlug}>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  {group.category}
                </div>
                {group.courses.map((course) => {
                  const isSelected = value.includes(course.title);
                  return (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => toggleCourse(course.title)}
                      className={cn(
                        "relative flex w-full cursor-pointer items-center rounded-md py-2 pl-8 pr-2 text-sm outline-none",
                        "hover:bg-accent hover:text-accent-foreground",
                        isSelected && "bg-accent/50"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute left-2 flex h-4 w-4 items-center justify-center rounded border",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </span>
                      <span className="truncate">{course.title}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          </div>,
          document.body
        )}
    </div>
  );
}
