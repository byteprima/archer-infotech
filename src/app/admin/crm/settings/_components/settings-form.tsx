"use client";

/**
 * The two automation switches.
 *
 * Both ship OFF. Turning auto-assign on quietly would start routing real
 * enquiries to people who are not expecting them, so it is a deliberate act
 * with the consequence spelled out beside it — including who the next enquiry
 * would actually go to.
 */

import { useState, useTransition } from "react";
import { Loader2, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { resetCrmSettings, saveCrmSettings } from "@/lib/actions/crm-settings";
import {
  CRM_SETTING_HELP,
  CRM_SETTING_LABELS,
  asBoolean,
  asFollowUpDays,
  type CrmSettingKey,
} from "@/lib/crm/settings";
import { toast } from "sonner";

function Toggle({
  id,
  checked,
  disabled,
  onChange,
  label,
  help,
}: {
  id: string;
  checked: boolean;
  disabled: boolean;
  onChange: (next: boolean) => void;
  label: string;
  help: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b py-4 last:border-0">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4"
      />
      <div>
        <Label htmlFor={id} className="font-medium">
          {label}
        </Label>
        <p className="mt-1 text-sm text-muted-foreground">{help}</p>
      </div>
    </div>
  );
}

export function CrmSettingsForm({
  settings,
  nextAssignee,
  canEdit,
  hasAiProvider,
}: {
  settings: Record<CrmSettingKey, string>;
  nextAssignee: string | null;
  canEdit: boolean;
  hasAiProvider: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [autoAssign, setAutoAssign] = useState(asBoolean(settings.auto_assign_enabled));
  const [autoFollowUp, setAutoFollowUp] = useState(
    asBoolean(settings.auto_follow_up_enabled),
  );
  const [days, setDays] = useState(String(asFollowUpDays(settings.auto_follow_up_days)));
  const [aiInsights, setAiInsights] = useState(asBoolean(settings.ai_insights_enabled));

  function save() {
    startTransition(async () => {
      const result = await saveCrmSettings({
        auto_assign_enabled: autoAssign ? "true" : "false",
        auto_follow_up_enabled: autoFollowUp ? "true" : "false",
        auto_follow_up_days: days,
        ai_insights_enabled: aiInsights ? "true" : "false",
      });
      toast[result.success ? "success" : "error"](result.message);
    });
  }

  return (
    <Card>
      <CardContent className="p-6">
        {!canEdit && (
          <p className="mb-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">
            Only an admin or manager can change these. Automation decides who
            real enquiries go to.
          </p>
        )}

        <Toggle
          id="auto-assign"
          checked={autoAssign}
          disabled={!canEdit || pending}
          onChange={setAutoAssign}
          label={CRM_SETTING_LABELS.auto_assign_enabled}
          help={CRM_SETTING_HELP.auto_assign_enabled}
        />
        {autoAssign && (
          <p className="-mt-2 mb-2 ml-7 rounded-md bg-muted p-2 text-xs text-muted-foreground">
            {nextAssignee
              ? `The next website enquiry would go to ${nextAssignee} — whoever currently has the fewest open leads.`
              : "There is nobody to assign to yet. Add a counsellor under Users first; until then enquiries stay unassigned."}
          </p>
        )}

        <Toggle
          id="auto-follow-up"
          checked={autoFollowUp}
          disabled={!canEdit || pending}
          onChange={setAutoFollowUp}
          label={CRM_SETTING_LABELS.auto_follow_up_enabled}
          help={CRM_SETTING_HELP.auto_follow_up_enabled}
        />
        {autoFollowUp && (
          <div className="-mt-2 mb-4 ml-7 space-y-1">
            <Label htmlFor="follow-up-days" className="text-xs">
              {CRM_SETTING_LABELS.auto_follow_up_days}
            </Label>
            <Input
              id="follow-up-days"
              type="number"
              min={0}
              max={30}
              className="w-28"
              value={days}
              disabled={!canEdit || pending}
              onChange={(e) => setDays(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {CRM_SETTING_HELP.auto_follow_up_days}
            </p>
          </div>
        )}

        <Toggle
          id="ai-insights"
          checked={aiInsights}
          disabled={!canEdit || pending || !hasAiProvider}
          onChange={setAiInsights}
          label={CRM_SETTING_LABELS.ai_insights_enabled}
          help={CRM_SETTING_HELP.ai_insights_enabled}
        />
        {!hasAiProvider && (
          <p className="-mt-2 mb-2 ml-7 rounded-md bg-muted p-2 text-xs text-muted-foreground">
            No AI provider is configured, so this cannot be switched on. Set
            GEMINI_API_KEY and redeploy first.
          </p>
        )}
        {aiInsights && hasAiProvider && (
          <p className="-mt-2 mb-2 ml-7 rounded-md bg-amber-50 p-2 text-xs text-amber-900">
            Briefings are generated by Google&apos;s Gemini API. Each one sends
            that lead&apos;s course interest, education, situation and your
            follow-up notes — never their name, phone number or email. Lead
            scoring is unaffected and works with this off.
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
          <Button disabled={!canEdit || pending} onClick={save}>
            {pending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save
          </Button>
          <Button
            variant="ghost"
            disabled={!canEdit || pending}
            onClick={() =>
              startTransition(async () => {
                const result = await resetCrmSettings();
                if (result.success) {
                  setAutoAssign(false);
                  setAutoFollowUp(false);
                  setDays("1");
                  setAiInsights(false);
                }
                toast[result.success ? "success" : "error"](result.message);
              })
            }
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to defaults
          </Button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Applies to website enquiries only. A lead you type in by hand is never
          auto-assigned — you are standing right there.
        </p>
      </CardContent>
    </Card>
  );
}
