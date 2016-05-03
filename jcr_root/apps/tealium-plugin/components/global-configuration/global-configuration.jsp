<%@page session="false"%>
<%@include file="/libs/foundation/global.jsp"%>
<%@page import="org.apache.sling.commons.json.JSONObject" %>

<c:set var="enableGlobalCustomUDO" value="${not empty properties['enableCustomUDO']}" scope="request" />

<%
            Property property = null;
            boolean isUDOmultiple = false;

            if(currentNode != null && currentNode.hasProperty("udo")){
                property = currentNode.getProperty("udo");
                isUDOmultiple = property.isMultiple();
            }
%>

<div class="tealium-global-configuration">
    <div class="logo">
        <img src="/content/dam/tealium-plugin/Tealium logo.png">
    </div>

    <div class="left">
        <img src="/content/dam/tealium-plugin/Tealium global.png">
    </div>

    <div class="right">
        <div class="configuration-header">
            Global configuration status:
        </div>

        <div class="configuration-entity">
            enabled: <span class="entity-value"> ${not empty properties['enabled']} </span>
        </div>
        <div class="configuration-entity">
            Account: <span class="entity-value"> ${properties['account']} </span>
        </div>
        <div class="configuration-entity">
            Profile: <span class="entity-value"> ${properties['profile']} </span>
        </div>
        <div class="configuration-entity">
            Environment: <span class="entity-value"> ${properties['environment']} </span>
        </div>
        <div class="configuration-entity">
            Enable  utag sync js: <span class="entity-value"> ${not empty properties['enableUtagSyncJs']} </span>
        </div>
        <div class="configuration-entity">
            Enable custom UDO: <span class="entity-value"> ${enableGlobalCustomUDO} </span>
        </div>
        <div class="configuration-entity <c:if test='${not enableGlobalCustomUDO}'>disabled</c:if>">
            Global UDO:
            <ul>
                <c:if var="multipleUDO" test="<%=isUDOmultiple%>" >
                    <c:forEach var="udo" items="${properties['udo']}">
                        <li class="entity-value" data-udo-value='${udo}'></li>
                    </c:forEach>
                </c:if>
                <c:if test="${not multipleUDO}">
                    <li class="entity-value" data-udo-value='${properties["udo"]}'></li>
                </c:if>
           </ul>
        </div>
    </div>
</div>